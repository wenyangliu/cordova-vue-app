<template>
  <div id="app">
    <img alt="Vue logo" :src="imgsrc" width="100%">

    <p>{{msg}}</p><br/>

    <button @click="getCordova">Cordova信息</button>
    <button @click="getDeviceInfo">设备信息</button>
    <button @click="getPosition">获取位置</button>
    <button @click="getImage">显示本地图片</button>
    <button @click="getCode">获取二维码</button>
    <br/>
    <p>{{codeInfo}}</p>
    <br>
    <p>地理位置-自带插件：{{ownMap}}</p>
    <p>地理位置-高德插件：{{mapSuccess}}</p>
    <p>地理位置错误：{{mapError}}</p>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'app',
    data() {
      return {
        imgsrc: require('./assets/bg.jpg'),
        msg: 'Cordova+Vue App',
        codeInfo: '',
        ownMap: '',
        mapSuccess: '',
        mapError: '',
      }
    },
    methods: {
      getCordova() {
        this.codeInfo = JSON.stringify(Vue.cordova)
      },
      getDeviceInfo() {
        this.codeInfo = JSON.stringify(Vue.cordova.device)
      },
      getCode() {
        let that = this
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            that.codeInfo = `We got a barcode
               Result: ${result.text}
               Format: ${result.format}
               Cancelled: ${result.cancelled}`
          },
          function (error) {
            alert("Scanning failed: " + error)
          })
      },
      getPosition() {
        navigator.vibrate(500)
        let that = this
        window.GaoDe.getCurrentPosition(function (result) {
          that.mapSuccess = JSON.stringify(result)
        }, function (error) {
          that.mapError = JSON.stringify(error)
        })
        let onSuccess = function (position) {
          let positionObject = {}

          if ('coords' in position) {
            positionObject.coords = {}

            if ('latitude' in position.coords) {
              positionObject.coords.latitude = position.coords.latitude
            }
            if ('longitude' in position.coords) {
              positionObject.coords.longitude = position.coords.longitude
            }
            if ('accuracy' in position.coords) {
              positionObject.coords.accuracy = position.coords.accuracy
            }
            if ('altitude' in position.coords) {
              positionObject.coords.altitude = position.coords.altitude
            }
            if ('altitudeAccuracy' in position.coords) {
              positionObject.coords.altitudeAccuracy = position.coords.altitudeAccuracy
            }
            if ('heading' in position.coords) {
              positionObject.coords.heading = position.coords.heading
            }
            if ('speed' in position.coords) {
              positionObject.coords.speed = position.coords.speed
            }
          }

          if ('timestamp' in position) {
            positionObject.timestamp = position.timestamp;
          }
          // Use the positionObject instead of the position 'object'
          that.ownMap = 'success' + JSON.stringify(positionObject)
        }
        let error = function (error) {
          that.ownMap = 'error' + JSON.stringify(error)
        }
        navigator.geolocation.getCurrentPosition(onSuccess, error, {
          maximumAge: 30000,
          timeout: 30000,
          enableHighAccuracy: 1
        })
      },
      getImage() {
        let that = this
        let cameraOptions = {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: 0
        }
        Vue.cordova.camera.getPicture(function (imageURI) {
          that.codeInfo = imageURI
          that.imgsrc = imageURI
        }, function onFail(message) {
          alert('Failed because: ' + message)
        }, cameraOptions)
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-bottom: 60px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
</style>
