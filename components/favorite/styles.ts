import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  //NOTE container
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  good: {
    top: 25,
    fontSize: 30,
  },
  //NOTE main
  header: {
    marginTop: 20,
    marginLeft: 40,
  },
  zanteitaisaku: {
    flex: 1,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    top: 200,
  },
  //NOTE icon

  scrollView: {
    flex: 1,
  },
  iconConteiner: {
    flex: 1,
  },
  iconsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: '5%',
    paddingHorizontal: '7.5%',
    justifyContent: 'flex-start',
  },
  iconWrapper: {
    top: -150,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  number: {
    zIndex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    minWidth: 30,
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    backgroundColor: 'red',
    borderRadius: 17,
    padding: 5,
    position: 'absolute',
    top: 0,
    left: -30,
    overflow: 'hidden',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    width: 110,
    borderWidth: 1,
    borderColor: 'rgb(200, 200, 200)',
    borderRadius: 100,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 30,
      height: 30,
    },
    shadowOpacity: 0.45,
    shadowRadius: 0,
    elevation: 60,
  },
  photo: {
    height: 110,
    width: 110,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  name: {
    fontWeight: '700',
    marginTop: '3%',
  },
  //NOTE footer
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 32,
    padding: 10,
    position: 'relative',
    bottom: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'rgb(230, 230, 230)',
    width: '100%',
    zIndex: 2,
    height: 70,
    color: 'rgb(130, 130, 130)',
  },
  footerIcon: {
    fontSize: 30,
  },
  footerUp: {
    color: 'rgb(150, 150, 150)',
  },
});
