import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    backgroundColor: "#EEE2DE",
    fontFamily: "KiwiMaru-Regular",
  },
  //NOTE header
  header: {
    top: "6%",
    height: "10%",
    width: "100%",
    backgroundColor: "#2B2A4C",
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
    color: "#EEE2DE",
    fontWeight: "bold",
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
    height: 60,
    width: 90,
    position: "relative",
    top: "60%",
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontFamily: "KiwiMaru-Regular",
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
    fontWeight: "bold",
    fontFamily: "KiwiMaru-Regular",
  },
  notify: {
    flex: 1,
  },
  button: {
    height: 40,
    width: 90,
    top: 0,
    left: 180,
    position: "relative",
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 50,
  },
  //NOTE 文字要素
  input: {
    zIndex: 10,
    top: 30,
    left: 20,
    backgroundColor: "white",
    textAlign: "left",
    fontSize: 20,
    height: 30,
    width: 100,
    borderRadius: 10,
    fontWeight: "bold",
    fontFamily: "KiwiMaru-Regular",
  },
  font: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    fontFamily: "KiwiMaru-Regular",
  },
});
export default styles;
