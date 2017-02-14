import Inferno from 'inferno';
import Component from 'inferno-component';
import classNames from 'classnames';
import ImageToCanvas from 'imagetocanvas';
import request from 'superagent';
const {resizeImage} = require('./helperfncs');
const {getOrientation} = require('./getOrientation/index');
const {serializeImage} = require('./serializeImage/index');

export default class Camera extends Component {
  constructor() {
    super();

    this.state = {
      imageLoaded: false,
      imageCanvasDisplay: 'none',
      spinnerDisplay: false,
      imageCanvasWidth: '28px',
      imageCanvasHeight: '320px',
      faceApiText: null,
      updateFeedback: '',
      storingFace: false,
      userData: '',
      detectedFaces: null,
      faceDataFound: false,
      currentImg: null,
      sw: 0,
      sh: 0
    };
    this.camera = null;
    this.photoCanvas = null;
    this.inputname = '';
    this.inputdata = '';
    this.putImage = this.putImage.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
    this.faceRecog = this.faceRecog.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.createPersistedFaceID = this.createPersistedFaceID.bind(this);
    this.addPersonFace = this.addPersonFace.bind(this);
    this.createPerson = this.createPerson.bind(this);
    this.trainGroup = this.trainGroup.bind(this);
  }

  putImage(img, orientation) {
    const canvas = this.photoCanvas;
    let w = img.width;
    let h = img.height;
    const {sw, sh} = resizeImage(w, h, 600, 600);
    let tempCanvas = document.createElement('canvas');
    let tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = sw;
    tempCanvas.height = sh;
    tempCtx.drawImage(img, 0, 0, sw, sh);
    ImageToCanvas.drawCanvas(canvas, img, orientation, sw, sh, 1, 0, false);
    this.setState({
      sw,
      sh
    })
  }

  takePhoto(event) {
    let files = event.target.files,
      file;
    if (files && files.length > 0) {
      file = files[0];
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        // fetch("/upload",
        //   {
        //     method: "POST",
        //     body: {photo: event.target.result},
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        //   })
        //   .then(function(res){ console.log('RES', res.json()); })
        //   .then(function(data){ alert( JSON.stringify( data ) ) });


        request
          .post('/upload')
          .send({photo: event.target.result})
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .end((err, res) => {
            if (err) {
              console.log(err);
            }
            console.log("res", res.text);
            this.setState({
              storedImage: res.text
            });
            this.faceRecog(res.text);
          });

        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          getOrientation(file, (orientation) => {
            if (orientation < 0) orientation = 1;
            this.putImage(img, orientation);
            this.setState({imageLoaded: true});
          });
        }
      };

      fileReader.readAsDataURL(file);
    }
  }


  faceRecog(url) {
    let canvas = this.photoCanvas;
    const ctx = canvas.getContext("2d");
    const dataURL = canvas.toDataURL();

    this.setState({
      spinnerDisplay: true
    });


    // There's two ways to send images to the cognitive API.
    // 1. Send a Image URL (need to set Content-Type as application/json)
    // 2. Send a binary (need to set Content-Type as octet-stream). The image need to be serialized.
    request
      .post('https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true')
      // .send(serializeImage(dataURL))
      // .set('Content-Type', 'application/octet-stream')
      .send({url})
      .set('Content-Type', 'application/json')
      .set('Ocp-Apim-Subscription-Key', '286fe5360c85463bac4315dff365fdc2')
      .set('processData', false)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          // TODO: error logging
          // console.error(err);
        } else {
          const data = JSON.stringify(res.body);
          res.body.map(e => {
            console.log(e);
            console.log("storedImage", this.state.storedImage, this.state.sw, this.state.sh);
            // let img = new Image;
            // img.onload =  () => {
            //  // ImageToCanvas.drawCanvas(canvas,img, 1, this.state.sw, this.state.sh, 1, 0, false);
            //
            //   ctx.drawImage(img, 0, 0,this.state.sw, this.state.sh);
            //   ctx.beginPath();
            //   ctx.fillStyle = "red";
            //   ctx.globalAlpha = 0.4;
            //   ctx.fillRect(e.faceRectangle.left, e.faceRectangle.top, e.faceRectangle.width, e.faceRectangle.height);
            //   ctx.globalAlpha = 1.0;
            //
            // };
            // img.src = "https://res.cloudinary.com/sven-anders-robbestad/image/upload/c_scale,w_337,h_600/v1487015753/facer/1487015753680.png";

            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.globalAlpha = 0.4;
            ctx.fillRect(e.faceRectangle.left, e.faceRectangle.top, e.faceRectangle.width, e.faceRectangle.height);
            ctx.globalAlpha = 1.0;


            // ctx.fillStyle = "red";
            // ctx.globalAlpha = 0.2;
            // ctx.fillRect(e.faceLandmarks.pupilLeft.x, e.faceLandmarks.pupilLeft.y, 5, 5);
            // ctx.globalAlpha = 1.0;
            // ctx.fillStyle = "red";
            // ctx.globalAlpha = 0.2;
            // ctx.fillRect(e.faceLandmarks.pupilRight.x, e.faceLandmarks.pupilRight.y, 5, 5);
            // ctx.globalAlpha = 1.0;
            //
            // ctx.globalAlpha = 0.2;
            // ctx.fillRect(e.faceLandmarks.mouthLeft.x, e.faceLandmarks.mouthRight.y,  e.faceLandmarks.mouthRight.x - e.faceLandmarks.mouthLeft.x, 10);
            // ctx.globalAlpha = 1.0;


          });
          const faces = res.body.map(f => {
            return {
              faceId: f.faceId,
              target: '' + f.faceRectangle.top + ',' + f.faceRectangle.left + ',' + f.faceRectangle.width + ',' + f.faceRectangle.height,
              faceRectangle: f.faceRectangle
            }
          });
          this.setState({
            detectedFaces: faces,
            faceApiText: data,
            faceDataFound: true,
            spinnerDisplay: false
          })
        }
      });
  }

  createPersistedFaceID() {
    //RETURNS A PERSISTED FACE ID

    let canvas = this.photoCanvas;
    const dataURL = canvas.toDataURL();

    return new Promise((resolve, reject) => {
      request
        .post('https://westus.api.cognitive.microsoft.com/face/v1.0/facelists/aspc2017faces/persistedFaces')
        .send(serializeImage(dataURL))
        .set('Content-Type', 'application/octet-stream')
        .set('Ocp-Apim-Subscription-Key', '286fe5360c85463bac4315dff365fdc2')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err || !res.ok) {
            reject(err);
          } else {
            resolve(res.body);
          }
        })
    });
  }

  createPerson() {
    // RETURNS a personId
    return new Promise((resolve, reject) => {
      request
        .post('https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/aspc2017facegroup/persons')
        .send({
          "name": this.inputname.value,
          "userData": this.inputdata.value
        })
        .set('Ocp-Apim-Subscription-Key', '286fe5360c85463bac4315dff365fdc2')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err || !res.ok) {
            reject(err);
          } else {
            resolve(res.body.personId);
          }
        })
    });
  }

  trainGroup() {
    // RETURNS a personId
    return new Promise((resolve, reject) => {
      request
        .post('https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/aspc2017facegroup/train')
        .set('Ocp-Apim-Subscription-Key', '286fe5360c85463bac4315dff365fdc2')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err || !res.ok) {
            reject(err);
          } else {
            resolve(res);
          }
        })
    });
  }

  addPersonFace(personId) {
    let canvas = this.photoCanvas;
    const dataURL = canvas.toDataURL();

    return new Promise((resolve, reject) => {
      request
        .post('https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/aspc2017facegroup/persons/' + personId + '/persistedFaces')
        .send(serializeImage(dataURL))
        .set('Content-Type', 'application/octet-stream')
        .set('Ocp-Apim-Subscription-Key', '286fe5360c85463bac4315dff365fdc2')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err || !res.ok) {
            reject(err);
          } else {
            const data = JSON.stringify(res.body);
            resolve(data);
          }
        })
    });

  }


  uploadImage() {
    // store ID to FACE API

    this.setState({
      spinnerDisplay: true,
      storingFace: true,
      updateFeedback: 'Creating a face ID'
    });

    // CREATE A PERSISTED FACE ID
    this.createPersistedFaceID()
      .then(persistedFaceId => {
        this.setState({
          updateFeedback: 'Creating a Person',
          persistedFaceId
        });

        // CREATE A PERSON
        this.createPerson()
          .then(personId => {
            // ADD A PERSON FACE
            this.setState({
              updateFeedback: 'Adding the face to the person'
            });

            this.addPersonFace(personId)
              .then(persistedGroupFaceId => {
                this.setState({
                  updateFeedback: 'Training the new list'
                });

                this.trainGroup()
                  .then(() => {
                    // Returns a persistedGroupFaceId
                    this.setState({
                      updateFeedback: '',
                      persistedGroupFaceId
                    });

                    // console.log('success');
                    // console.log('persistedFaceId', persistedFaceId);
                    // console.log('personId', personId);
                    // console.log('persistedGroupFaceId', persistedGroupFaceId);
                    // TODO: use inferno router instead of window.location
                    window.location.href = "/#uploaded";
                  })

              })
              .catch(err => {
                alert(JSON.stringify(err));
              });
          })
          .catch(err => {
            alert(JSON.stringify(err));
          });
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });


  }

  render() {
    const canvasCSS = classNames({
      hidden: !this.state.faceDataFound,
      cameraFrame: true
    });
    const buttonCSS = classNames({
      hidden: this.state.imageLoaded
    });
    const spinnerCSS = classNames({
      hidden: !this.state.spinnerDisplay
    });
    const innerSpinnerCSS = classNames({
      spinner: true
    });

    const addCSS = classNames({
      hidden: !this.state.faceDataFound,
      metaInput: true
    });

    const hideWhileStoring = classNames({
      hidden: this.state.storingFace
    });

    const showWhileStoring = classNames({
      hidden: !this.state.storingFace && this.state.updateFeedback !== ''
    });


    return <div>
      <h1 className="center">ADD A PERSON</h1>
      <div className="center">

        <div className={buttonCSS}>
          <label className="camera-snap">
            <img src="/assets/camera_bw.svg" className="icon-camera"
                 alt="Click to snap a photo or select an image from your photo roll"/>
            <input type="file" name="photo" label="Camera" onChange={this.takePhoto}
                   ref={node => {
                     this.camera = node;
                   }}
                   className="camera" accept="image/*"/>
          </label>
        </div>

        <div className={showWhileStoring}>
          {this.state.updateFeedback}
        </div>

        <div className={spinnerCSS}>
          <div className={innerSpinnerCSS}>
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>

        <div className={hideWhileStoring}>
          <div className={canvasCSS}>
            <canvas ref={node => {
              this.photoCanvas = node;
            }} className="imageCanvas">
              Your browser does not support the HTML5 canvas tag.
            </canvas>
          </div>


          <div className={addCSS}>
            <label htmlFor="name">NAME</label>
            <input id="name" type="text" ref={node => {
              this.inputname = node;
            }} className="darkInput"/>

            <label htmlFor="metadata">METADATA</label>
            <textarea id="metadata" ref={node => {
              this.inputdata = node;
            }} className="darkInput"/>

            <label htmlFor="addBtn"/>
            <button id="addBtn" className="darkButton" onClick={this.uploadImage} value="add">ADD</button>
          </div>
        </div>


      </div>
    </div>
  }
}
