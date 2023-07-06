import {
  Dispatch,
  SetStateAction,
  createContext,
  memo,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from "react-native";
import { Authenticator, useTheme } from "@aws-amplify/ui-react-native";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports.js";
import * as Notifications from "expo-notifications";
import Icon from "react-native-vector-icons/Ionicons";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
// import Storage from "react-native-storage";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { cards } from "./data/cards"; // ダミーデータ (YOLP API使用予定)
import { Prefecture } from "./data/globals";
import AuthenticatorFormFields from "./components/login/AuthenticatorFormFields";
import TinderSwipe from "./components/home/TinderSwipe";
import Detail from "./components/home/Detail";
import Notice from "./components/notice/Notice";
import Map from "./components/map/Map";
import Favorites from "./components/favorites/Favorites";
import Spots from "./components/favorites/Spots";
import User from "./components/user/User";
import Footer from "./components/Footer";
import Modal from "react-native-modal";
import GenreIcon from "react-native-vector-icons/MaterialCommunityIcons";
import GenreIcon2 from "react-native-vector-icons/MaterialIcons";
import { prefectureListData } from "./data/prefectureList";
import LottieView from "lottie-react-native";


Auth.configure(awsconfig);
Amplify.configure(awsconfig);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const SERVER_URL =
  "https://o49zrrdot8.execute-api.us-east-1.amazonaws.com/tokitabi";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = [
  page: string,
  setPage: Dispatch<SetStateAction<string>>,
  prefecture: string,
  setPrefecture: Dispatch<SetStateAction<string>>,
  hasVisited: boolean,
  setHasVisited: Dispatch<SetStateAction<boolean>>
];

export const MyContext = createContext<Props>([
  "",
  () => {},
  "",
  () => {},
  false,
  () => {},
]);

// // ストレージの作成
// export const storage: Storage = new Storage({
//   // 最大容量
//   size: 1000,
//   // バックエンドにAsyncStorageを使う
//   storageBackend: AsyncStorage,
//   // キャッシュ期限(null=期限なし)
//   defaultExpires: null,
//   // メモリにキャッシュするかどうか
//   enableCache: true,
//   // 初期化時にデータを同期するためのオプション
//   sync: {},
// });

const App = memo(() => {
  const [noticeCount, setNoticeCount] = useState(3); // 通知カウント設定
  const [touchId, setTouchId] = useState(0);
  const [favoriteData, setFavoriteData] = useState<Prefecture[]>([]);
  const [username, setUsername] = useState("");
  const [page, setPage] = useState("home");
  const [index, setIndex] = useState(0);
  const [prefecture, setPrefecture] = useState("");
  const [inputRef, setInputRef] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [hasCount, setHasCount] = useState(0);
  const [ramdomCards, setRamdomCards] = useState([]);
  const [ramdomCardsChange, setRamdomCardsChange] = useState(false);
  const [sliceCards, setSliceCards] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { control } = useForm();
  const [prefectureOpen, setPrefectureOpen] = useState(false);
  const [prefectureValue, setPrefectureValue] = useState(null);
  const [prefectureList, setPrefectureList] = useState(prefectureListData);
  const [animation] = useState(new Animated.Value(0));
  const [likeCheck, setLikeCheck] = useState(false);

  const filterPrefecture = () => {
    console.log(prefectureValue);
    setRamdomCards([]);
    (async () => {
      const ramdomCardsData = await fetch(
        `${SERVER_URL}/api/cards/test?prefecture=${prefectureValue}`
      ).then((data) => data.json());
      console.log(ramdomCardsData);
      setRamdomCards(ramdomCardsData);
    })();
  };

  useEffect(() => {
    setRamdomCards([]);
    (async () => {
      const ramdomCardsData = await fetch(`${SERVER_URL}/api/cards/test`).then(
        (data) => data.json()
      );
      setRamdomCards(ramdomCardsData);
    })();
  }, [ramdomCardsChange]);

  useEffect(() => {
    setRamdomCards((prev) => prev.slice(0, prev.length - 1));
  }, [sliceCards]);

  useEffect(() => {
    requestPermissionsAsync();
    Notifications.setBadgeCountAsync(0);

    // storage
    //   .load({ key: "data" })
    //   .then((res) => console.log("App", res))
    //   .catch((err) => console.warn("App", err));
  }, []);

  // description 通知数設定用
  const userToApp = (userdata: SetStateAction<number>) =>
    setNoticeCount(userdata);

  //description ID取得用
  const spotToApp = (id: SetStateAction<number>) => setTouchId(id);

  useEffect(() => {
    (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUsername(user.attributes.nickname);
      } catch (error) {
        console.log("Error getting username:", error);
      }
    })();
  }, []);

  //通知送信用エフェクト
  useEffect(() => {
    (async () => {
      favoriteData.length !== 0 &&
        //favデータ取得
        favoriteData.forEach(async (obj) => {
          const getPrefectureFavoriteData = await fetch(
            `${SERVER_URL}/api/favorites/${obj.name}`
          ).then((data) => data.json());
          type props = {
            hasVisited: boolean;
          };

          //行ったよ数セット
          const hascount =
            obj.number -
            (await getPrefectureFavoriteData.filter((data: props) => {
              return data.hasVisited;
            }).length);
          hascount >= noticeCount &&
            // プッシュ通知を実際に送信する
            (await Notifications.scheduleNotificationAsync({
              content: {
                body: `🧳旅行先が『${hascount}ヶ所』溜まっています!!`,
                title: `${obj.name}に行ってみませんか？`,
                sound: "default",
                // subtitle: 'subtitle',
                // badge: 1,
              },
              trigger: {
                seconds: 1,
              },
            }));
          Notifications.setBadgeCountAsync(1);
        });
    })();
  }, [favoriteData]);

  const scheduleNotificationAsync = async () => {
    const res = await fetch(`${SERVER_URL}/api/favorites`).then((data) =>
      data.json()
    );
    setFavoriteData(res);
  };

  const requestPermissionsAsync = async () => {
    // 現時点の通知権限の情報を取得する
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) return;

    // ユーザーに通知権限を要求するポップアップを出す
    await Notifications.requestPermissionsAsync();
  };

  // フィルターに使う予定
  console.log(inputRef);

  //フィルター画面の設定
  const toggleModal = () => {
    setIsModalVisible((prevState) => !prevState);
    // setInputElement(text);
  };
  //フィルター画面のアニメーション
  //文字を一気に大きくして徐々に小さくしたい
  const [isAnimating, setIsAnimating] = useState(false);
  const animations = useRef([
    new Animated.Value(1), // テキスト1のアニメーション
    new Animated.Value(1), // テキスト2のアニメーション
    new Animated.Value(1), // テキスト3のアニメーション
  ]).current;

  const startAnimation = () => {
    setIsAnimating(true);

    const animationSequences = [
      Animated.sequence([
        Animated.delay(400),
        Animated.timing(animations[0], {
          toValue: 3.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animations[0], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(700),
        Animated.timing(animations[1], {
          toValue: 3.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animations[1], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(animations[2], {
          toValue: 3.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animations[2], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ];

    Animated.parallel(animationSequences).start(() => {
      setIsAnimating(false);
    });
  };

  useEffect(() => {
    if (isAnimating) {
      startAnimation();
    }
  }, [isAnimating]);

  const handlePress = () => {
    toggleModal();
    setIsAnimating(!isAnimating);
  };

  const textStyles = animations.map((animation) => ({
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.1],
        }),
      },
    ],
  }));
  // //いいねアニメーション
  // useEffect(() => {
  //   if (likeCheck) {
  //     goodAnimation();
  //     setLikeCheck(false); // `goodAnimation`を実行する処理を記述
  //   }
  // }, [likeCheck]);

  const goodAnimation = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      slideOutAnimation();
    });
  };
  const slideOutAnimation = () => {
    Animated.timing(animation, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -500],
  });

  const [isAnimationVisible, setIsAnimationVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [likeCheck]);

  return (
    <Authenticator.Provider>
      <Authenticator
        Header={() => {
          const { tokens } = useTheme();
          return (
            <View>
              <Text
                style={{
                  fontSize: tokens.fontSizes.xxl,
                  paddingHorizontal: tokens.space.large,
                }}
              >
                とき旅
              </Text>
              <LottieView
                source={require("./assets/lottie/82445-travelers-walking-using-travelrmap-application.json")}
                autoPlay={true}
                style={{ position: "absolute", height: 100, left: 70 }}
              />
            </View>
          );
        }}
        Container={(props) => (
          <Authenticator.Container
            {...props}
            style={{ backgroundColor: "white" }}
          />
        )}
        initialState="signIn"
        components={{
          // サインアップフィールド
          SignUp: ({ fields, ...props }) => (
            <Authenticator.SignUp {...props} fields={AuthenticatorFormFields} />
          ),
          // サインインフィールド
          SignIn: ({ fields, ...props }) => (
            <Authenticator.SignIn
              {...props}
              fields={[
                {
                  name: "username",
                  label: "ユーザーネーム",
                  type: "default",
                  placeholder: "ユーザーネーム",
                },
                {
                  name: "password",
                  label: "パスワード",
                  type: "default",
                  placeholder: "パスワード",
                  secureTextEntry: true,
                },
              ]}
            />
          ),
        }}
      >
        <View style={styles.container}>
          <MyContext.Provider
            value={[
              page,
              setPage,
              prefecture,
              setPrefecture,
              hasVisited,
              setHasVisited,
            ]}
          >
            {page === "home" && (
              <View>
                <View style={styles.header}>
                  <Icon name="search-outline" style={styles.headerIcon} />
                  {/* <TextInput
                    placeholder="都道府県を選択"
                    style={styles.headerTextInput}
                    value={inputRef}
                    onChangeText={(text) => setInputRef(text)}
                  /> */}
                  <Controller
                    name="prefecture"
                    defaultValue=""
                    control={control}
                    render={() => (
                      <View style={styles.dropdownCompany}>
                        <DropDownPicker
                          style={styles.dropdown}
                          containerStyle={{ borderColor: "white" }}
                          open={prefectureOpen}
                          value={prefectureValue}
                          items={prefectureList}
                          setOpen={setPrefectureOpen}
                          setValue={setPrefectureValue}
                          setItems={setPrefectureList}
                          placeholder="都道府県を選択"
                          placeholderStyle={styles.placeholderStyles}
                          searchable={true}
                          searchPlaceholder="都道府県を入力"
                          onChangeValue={filterPrefecture}
                        />
                      </View>
                    )}
                  />
                  <TouchableOpacity onPress={toggleModal}>
                    <Icon
                      name="options-outline"
                      style={styles.headerIcon}
                      onPress={handlePress}
                    />
                  </TouchableOpacity>
                  <Modal isVisible={isModalVisible}>
                    {/* Modalの配置設定 */}
                    <TouchableOpacity
                      activeOpacity={1}
                      onPressOut={toggleModal}
                    >
                      <View
                        style={{
                          // flex: 1,
                          alignItems: "center",
                          backgroundColor: "rgba( 0, 0, 0)",
                        }}
                      >
                        <View
                          style={[styles.allGenreContainer, { width: "80%" }]}
                        >
                          {/* <TouchableOpacity
                      style={styles.friend}
                      // onPress={}
                    > */}
                          <Animated.View style={textStyles[0]}>
                            <Text style={styles.genreText}>相手でえらぶ</Text>
                          </Animated.View>
                          <View style={styles.human}>
                            <TouchableOpacity
                              // onPress={}
                              style={styles.genreContainer}
                            >
                              <GenreIcon
                                name="human-male-female-child"
                                style={styles.genreIcon}
                              />
                              <Text style={styles.miniGenre}>家族と</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              // onPress={}
                              style={styles.genreContainer}
                            >
                              <GenreIcon
                                name="account-child"
                                style={styles.genreIcon}
                              />
                              <Text style={styles.miniGenre}>子供と</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              // onPress={}
                              style={styles.genreContainer}
                            >
                              <GenreIcon
                                name="kabaddi"
                                style={styles.genreIcon}
                              />
                              <Text style={styles.miniGenre}>友達と</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              // onPress={}
                              style={styles.genreContainer}
                            >
                              <GenreIcon
                                name="account-heart"
                                style={styles.genreIcon}
                              />
                              <Text style={styles.miniGenre}>恋人と</Text>
                            </TouchableOpacity>
                          </View>
                          <Animated.View style={textStyles[1]}>
                            <Text style={styles.genreText}>目的でえらぶ</Text>
                          </Animated.View>
                          <View style={styles.human}>
                            <TouchableOpacity
                              // onPress={}
                              style={styles.genreContainer}
                            >
                              <GenreIcon
                                name="ferris-wheel"
                                style={styles.genreIcon}
                              />
                              <Text style={styles.miniGenre}>遊園地</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              // onPress={}
                              style={styles.genreContainer}
                            >
                              <GenreIcon
                                name="kayaking"
                                style={styles.genreIcon}
                              />
                              <Text style={styles.miniGenre}>趣味</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              // onPress={}
                              style={styles.genreContainer}
                            >
                              <GenreIcon
                                name="forest"
                                style={styles.genreIcon}
                              />
                              <Text style={styles.miniGenre}>景色</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              // onPress={}
                              style={styles.genreContainer}
                            >
                              <GenreIcon2
                                name="museum"
                                style={styles.genreIcon}
                              />
                              <Text style={styles.miniGenre}>博物館</Text>
                            </TouchableOpacity>
                          </View>
                          <Animated.View style={textStyles[2]}>
                            <Text style={styles.genreText}>手段でえらぶ</Text>
                          </Animated.View>
                          <View style={styles.human}>
                            <TouchableOpacity
                              // onPress={}
                              style={styles.genreContainer}
                            >
                              <GenreIcon
                                name="car-hatchback"
                                style={styles.genreIcon}
                              />
                              <Text style={styles.miniGenre}>車</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              // onPress={}
                              style={styles.genreContainer}
                            >
                              <GenreIcon
                                name="train"
                                style={styles.genreIcon}
                              />
                              <Text style={styles.miniGenre}>電車</Text>
                            </TouchableOpacity>
                          </View>
                          {/* </TouchableOpacity> */}
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </View>
                <View style={styles.main}>
                  <Animated.View
                    style={[
                      styles.iconContainer,
                      { transform: [{ translateY }] },
                    ]}
                  >
                    <Icon name="thumbs-up" size={150} color="#FFDB5F" />
                  </Animated.View>
                  <ImageBackground
                    source={require("./assets/homeBackImg.png")}
                    style={styles.container}
                    resizeMode="cover" // 画像をコンテナに合わせて拡大/縮小する
                  >
                    {isAnimationVisible && (
                      <LottieView
                        source={require("./assets/lottie/58909-like.json")}
                        autoPlay={true}
                        loop={false}
                        style={{ zIndex: 9999, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                      />
                    )}
                    <LottieView
                      source={require("./assets/lottie/148558-walking-steps.json")}
                      autoPlay={true}
                    />
                    <Text style={styles.mainText}>おすすめ終了！</Text>
                    {/* {cards.map((card, index) => ( */}
                    {ramdomCards[0] !== undefined &&
                      ramdomCards.map((card, index) => (
                        <TinderSwipe
                          key={index}
                          index={index}
                          card={card}
                          setPage={setPage}
                          setIndex={setIndex}
                          scheduleNotificationAsync={scheduleNotificationAsync}
                          ramdomCards={ramdomCards}
                          setSliceCards={setSliceCards}
                          setLikeCheck={setLikeCheck}
                          setIsAnimationVisible={setIsAnimationVisible}
                        />
                      ))}
                  </ImageBackground>
                </View>
              </View>
            )}

            {page === "detail" && (
              <Detail
                page={page}
                setPage={setPage}
                index={index}
                hasVisited={null}
                touchId={touchId}
                ramdomCards={ramdomCards}
              />
            )}

            {page === "notice" && <Notice />}

            {page === "map" && (
              <Map
                setPage={setPage}
                setIndex={setIndex}
                appToSpot={spotToApp}
              />
            )}

            {page === "fromMap" && (
              <Detail
                page={page}
                setPage={setPage}
                index={index}
                hasVisited={null}
                touchId={touchId}
                ramdomCards={null}
              />
            )}

            {page === "favorites" && <Favorites />}

            {page === "spots" && (
              <Spots
                setPage={setPage}
                prefecture={prefecture}
                setIndex={setIndex}
                setHasVisited={setHasVisited}
                appToSpot={spotToApp}
              />
            )}

            {page === "visited" && (
              <Detail
                page={page}
                setPage={setPage}
                index={index}
                hasVisited={hasVisited}
                touchId={touchId}
                ramdomCards={null}
              />
            )}

            {page === "user" && (
              <User
                userName={username}
                noticeSet={noticeCount}
                appToUser={userToApp}
              />
            )}

            {page !== "detail" && page !== "visited" && page !== "fromMap" && (
              <Footer
                page={page}
                setPage={setPage}
                setRamdomCardsChange={setRamdomCardsChange}
                setPrefectureValue={setPrefectureValue}
              />
            )}
          </MyContext.Provider>
        </View>
      </Authenticator>
    </Authenticator.Provider>
  );
});

const styles = StyleSheet.create({
  dropdownCompany: {
    width: "70%",
    height: 0,
    top: -9,
  },
  dropdown: {
    borderColor: "white",
  },
  placeholderStyles: {
    color: "grey",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    top: 50,
    borderRadius: 30,
    shadowColor: "rgb(200, 200, 200)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    zIndex: 1,
  },
  headerIcon: {
    fontSize: 30,
    color: "rgb(130, 130, 130)",
  },
  headerTextInput: {
    width: "70%",
  },
  main: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    // paddingBottom: 100,
  },
  mainText: {
    position: "absolute",
    marginTop: 350,
    marginHorizontal: 130,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
  },

  genreText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },

  allGenreContainer: {
    flexDirection: "column",
    height: 600,
    width: 250,
  },
  genreContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
    height: 100,
    marginRight: 20,
    fontSize: 10,
  },
  human: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,

    height: 200,
    width: 100,
  },

  genreIcon: {
    justifyContent: "space-between",
    fontSize: 60,
    color: "white",
  },
  miniGenre: { color: "white", fontSize: 12 },
  iconContainer: {
    position: "absolute",
    bottom: -150,
    alignSelf: "center",
    zIndex: 99,
  },
});

export default App;
