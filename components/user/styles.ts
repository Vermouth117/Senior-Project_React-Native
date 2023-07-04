import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    backgroundColor: "#EEE2DE",
  },
  //NOTE header
  header: {
    top: "6%",
    height: "10%",
    width: "100%",
    backgroundColor: "#000000",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
  face: {
    top: 0,
    left: 10,
    height: "90%",
    width: "20%",
    backgroundColor: "#EA906C",
    borderRadius: 100,
  },
  username: {
    top: "5%",
    left: "25%",
    height: "100%",
    width: "50%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#EEE2DE",
    fontFamily: "KiwiMaru-Regular",
  },
  //NOTE list
  list: {
    top: "16%",
    left: 0,
    height: "90%",
    width: "25%",
    backgroundColor: "#9E1B1B",
    position: "absolute",
    alignItems: "center",
  },
  signOut: {
    height: 40,
    width: 90,
    position: "relative",
    top: "60%",
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  listNotify: {
    height: "auto",
    position: "relative",
    top: "45%",
    borderRadius: 20,
    backgroundColor: "white",
  },
  //NOTE main
  main: {
    top: "16%",
    left: "25%",
    width: "75%",
    height: "75%",
    flex: 1,
    backgroundColor: "#EEE2DE",
    position: "absolute",
  },
  notify: {
    flex: 1,

    textAlign: "left",
    borderRadius: 10,
  },
  button: {
    height: 40,
    width: 90,
    position: "relative",
    top: "60%",
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  //NOTE 文字要素
  input: {
    backgroundColor: "white",
    textAlign: "left",
    fontSize: 20,
    height: 30,
    width: 100,
    borderRadius: 10,
  },
  font: {
    zIndex: 1,
    flex: 1,
    backgroundColor: "blue",
    fontSize: 25,
    textAlign: "left",
    fontWeight: "bold",
  },
});
export default styles;
