import React, {Component} from 'react';
import pic0 from './assets/images/adrienne-leonard-648479-unsplash.jpg';
import pic1 from './assets/images/alexander-mils-431542-unsplash.jpg';
import pic2 from './assets/images/andy-feliciotti-590837-unsplash.jpg';
import pic3 from './assets/images/ballon-ride.jpg';
import pic4 from './assets/images/chuttersnap-650068-unsplash.jpg';
import pic5 from './assets/images/brett-patzke-725745-unsplash.jpg';
import pic6 from './assets/images/chuttersnap-650068-unsplash.jpg';
import pic7 from './assets/images/deglee-degi-400520-unsplash.jpg';
import pic8 from './assets/images/gabriel-jimenez-241711-unsplash.jpg';
import pic9 from './assets/images/izuddin-helmi-adnan-616482-unsplash.jpg';
import pic10 from './assets/images/kyle-cottrell-649671-unsplash.jpg';
import pic11 from './assets/images/malte-fleuter-599763-unsplash.jpg';
import pic12 from './assets/images/nathan-dumlao-593273-unsplash.jpg';
import pic13 from './assets/images/nicholas-sampson-284246-unsplash.jpg';
import pic14 from './assets/images/oliver-sjostrom-584975-unsplash.jpg';
import pic15 from './assets/images/rec.jpg';
import pic16 from './assets/images/roland-losslein-685065-unsplash.jpg';
import pic17 from './assets/images/sabri-tuzcu-562189-unsplash.jpg';
import pic18 from './assets/images/samer-daboul-690501-unsplash.jpg';
import pic19 from './assets/images/sarah-dorweiler-357712-unsplash.jpg';
import pic20 from './assets/images/taneli-lahtinen-754080-unsplash.jpg';
import pic21 from './assets/images/thom-holmes-556800-unsplash.jpg';
import {
  ToastAndroid,
  Keyboard,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import {Font} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'expo';
import colors from './colors';

var counterForInterstitial = 0;
const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss ()}>
    {children}
  </TouchableWithoutFeedback>
);
export default class Deneme extends Component {
  constructor (props) {
    super (props);
    this.state = {
      author: '',
      quote: '',
      keyword: '',
      url: 'http://192.168.1.43:3000/quotes/',
      fontLoading: false,
      quotefetched: false,
      pic: '',
      settingsColor: colors[0].headerColor,
      headerColor: colors[0].headerColor,
      subHeaderColor: colors[0].subheaderColor,
      searchColor: colors[0].searchColor,
      interstitialOrNot: false,
    };
  }

  async componentDidMount () {
    const pictureArray = [
      pic0,
      pic1,
      pic2,
      pic3,
      pic4,
      pic5,
      pic6,
      pic7,
      pic8,
      pic9,
      pic10,
      pic11,
      pic12,
      pic13,
      pic14,
      pic15,
      pic16,
      pic17,
      pic18,
      pic19,
      pic20,
      pic21,
    ];
    const index = Math.floor (Math.random () * pictureArray.length);
    this.setState ({
      settingsColor: colors[index].settingsColor,
      headerColor: colors[index].headerColor,
      subHeaderColor: colors[index].subheaderColor,
      searchColor: colors[index].searchColor,
      pic: pictureArray[index],
    });
    console.log ('here damn');
    AdMobInterstitial.setTestDeviceID ('EMULATOR');

    AdMobInterstitial.setAdUnitID ('ca-app-pub-3940256099942544/1033173712');

    AdMobInterstitial.addEventListener ('interstitialDidLoad', () =>
      console.log ('interstitialDidLoad')
    );

    AdMobInterstitial.addEventListener ('interstitialDidFailToLoad', () =>
      console.log ('interstitialDidFailToLoad')
    );

    AdMobInterstitial.addEventListener ('interstitialDidOpen', () =>
      console.log ('interstitialDidOpen')
    );
    AdMobInterstitial.addEventListener ('interstitialDidClose', () => {
      this.setState ({quotefetched: false});
      console.log ('interstitialDidClose');
    });
    AdMobInterstitial.addEventListener (
      'interstitialWillLeaveApplication',
      () => console.log ('interstitialWillLeaveApplication')
    );
    try {
      await Font.loadAsync ({
        FuturaBook: require ('./assets/fonts/futurabook.ttf'),
        FuturaMedium: require ('./assets/fonts/futura_medium_bt.ttf'),
        FreeScript: require ('./assets/fonts/freescript.ttf'),
        'DFGothic-EB': require ('./assets/fonts/dfgothic-eb.ttf'),
      });
      this.setState ({fontLoading: true});
    } catch (error) {
      console.log ('Error loading fonts', error);
    }
  }
  capitalize(s)
  {
    return s[0].toUpperCase() + s.slice(1);
  }
  whiteSpaceHandle (text) {
    if (text.indexOf (' ') >= 0) {
      ToastAndroid.showWithGravity (
        'We can only do a word search for now!',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
      let deleteWhiteSpace = this.state.keyword.trim ();
      console.log (deleteWhiteSpace.length);
      this.setState ({keyword: deleteWhiteSpace});
      //alert ('Please Check Your Fields For Spaces');
      return false;
    }
    return true;
  }

  handlePress = () => {
    console.log (this.state.url + this.state.keyword);
    var textUrl = this.state.keyword.toLowerCase();
    textUrl= this.capitalize(textUrl);
    console.log(textUrl);
    fetch (this.state.url.concat (textUrl), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then (response => {
        responseData = response.json ();
        if (response.status == 200) {
          return responseData.then (data => {
            const quoteWithDoubles = '"' + data.quote + '"';
            this.setState ({author: data.author});
            this.setState ({quote: quoteWithDoubles});
            this.setState ({quotefetched: true});
          });
        } else {
          //throw new Error ('Server Error!');
        }
      })
      .catch (error => {
        console.error (error);
      });
  };

  interstitialOrNot () {
    this.setState ({quotefetched: false});
    counterForInterstitial = counterForInterstitial + 1;
    if (counterForInterstitial % 3 == 0) {
      this.setState ({interstitialOrNot: true});
      AdMobInterstitial.requestAdAsync ()
        .then (() => AdMobInterstitial.showAdAsync ())
        .catch (() => console.log ('haydar'));
    } else this.setState ({interstitialOrNot: false});
  }

  render () {
    if (!this.state.fontLoading) {
      return (
        <ImageBackground
          style={{
            flex: 1,
            opacity: 0.6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={this.state.pic}
        >
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          >
            <ActivityIndicator size="large" color="gray" />
          </View>
        </ImageBackground>
      );
    } else if (!this.state.quotefetched && !this.state.interstitialOrNot) {
      return (
        <ImageBackground style={styles.background} source={this.state.pic}>
          <KeyboardAvoidingView
            style={styles.keyboardavoidContainer}
            behavior="padding"
            enabled
          >
            <DismissKeyboard>
              <View style={styles.dissmissKeyboardContainer}>
                <View style={styles.top}>
                  <View style={styles.empty} />
                  <View style={styles.setting}>
                    <Ionicons
                      style={[styles.icon, {color: this.state.settingsColor}]}
                      name="ios-settings"
                      size={18}
                      color="white"
                    />
                  </View>
                </View>
                <View style={styles.middle}>
                  <View style={styles.emptyLeft} />
                  <View style={styles.mainContainer}>
                    <View style={styles.titlesView}>
                      <Text
                        style={[
                          styles.headerMain,
                          {color: this.state.headerColor},
                        ]}
                      >
                        FEEL GOOD
                      </Text>
                      <Text
                        style={[
                          styles.headerSub,
                          {color: this.state.subHeaderColor},
                        ]}
                      >
                        despite everything
                      </Text>
                    </View>
                    <View style={styles.downloadingView} />
                    <View style={styles.searchView}>
                      <View style={styles.searchIcon}>
                        <Ionicons
                          style={[styles.icon, {color: this.state.searchColor}]}
                          name="ios-search"
                          size={25}
                          color="white"
                        />
                      </View>
                      <View
                        style={[
                          styles.textInputView,
                          {color: this.state.searchColor},
                        ]}
                      >
                        <TextInput
                          autoCorrect={false}
                          underlineColorAndroid="rgba(0,0,0,0)"
                          style={[
                            {alignSelf: 'stretch', textAlign: 'center'},
                            {color: this.state.searchColor},
                          ]}
                          value={this.state.keyword}
                          //placeholder="keyword"
                          onChangeText={text => {
                            this.whiteSpaceHandle (text);
                            this.setState ({keyword: text});
                          }}
                          onSubmitEditing={event => {
                            this.setState ({keyword: event.nativeEvent.text});
                            this.handlePress ();
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.emptyRight} />
                </View>
                <View style={styles.searchBelow} />
              </View>
            </DismissKeyboard>
          </KeyboardAvoidingView>
          <View style={styles.ad}>
            <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
              testDeviceID="EMULATOR"
              onDidFailToReceiveAdWithError={this.bannerError}
            />
          </View>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          source={require ('./assets/images/bg_quote.jpg')}
          style={stylesSecondPage.background}
        >
          <View style={stylesSecondPage.textContainer}>
            <View style={stylesSecondPage.quoteView}>
              <Text style={stylesSecondPage.quoteText}>
                {this.state.quote}
              </Text>
            </View>
            <View style={stylesSecondPage.authorView}>
              <Text style={stylesSecondPage.authorText}>
                {this.state.author}
              </Text>
            </View>
          </View>
          <View style={stylesSecondPage.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.interstitialOrNot ()}
              // this.setState ({quotefetched: false});
            >
              <Ionicons name="md-close" size={40} color="#4A474E" />
            </TouchableOpacity>
          </View>

        </ImageBackground>
      );
    }
  }
}
const stylesSecondPage = StyleSheet.create ({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 20,
    flex: 10,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteText: {
    fontFamily: 'FuturaMedium',
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#4A474E',
  },
  authorText: {
    alignSelf: 'flex-end',
    fontFamily: 'FuturaBook',
    fontSize: 20,
    color: '#4A474E',
  },
  quoteView: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorView: {
    flex: 5,
    marginRight: 50,
  },
});
const styles = StyleSheet.create ({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardavoidContainer: {
    flex: 15,
  },
  ad: {
    flex: 1,
  },
  dissmissKeyboardContainer:{
    flex:1,
  },
  top: {
    flex: 2,
    flexDirection: 'row',
  },
  empty: {
    flex: 6,
  },
  setting: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 10,
    flexDirection: 'row',
  },
  searchBelow: {
    flex: 2,
  },
  emptyLeft: {
    flex: 1,
  },
  emptyRight: {
    flex: 1,
  },
  mainContainer: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlesView: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadingView: {
    flex: 15,
  },
  searchView: {
    flex: 3,
    flexDirection: 'row',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    color: 'rgba(255,255,255,0)',
  },
  searchIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputView: {
    flex: 12,
  },
  headerMain: {
    fontSize: 45,
    fontFamily: 'FuturaBook',
    color: 'white',
    fontWeight: '300',
  },
  headerSub: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'FreeScript',
  },
});
