import Inferno from 'inferno';
import Component from 'inferno-component';
import classNames from 'classnames';
import ImageToCanvas from 'imagetocanvas';
import request from 'superagent';
const {resizeImage} = require('./helperfncs');
const {getOrientation} = require('./getOrientation');
const {serializeImage} = require('./serializeImage');

// function findSimilar(face) {
//   // NEEDS A FACE LIST
//   const body = {
//     "faceId": face,
//     "faceListId": "aspc2017faces",
//     "maxNumOfCandidatesReturned": 10,
//     "mode": "matchPerson"
//   };
//
//   request
//     .post('https://westus.api.cognitive.microsoft.com/face/v1.0/findsimilars')
//     .send(body)
//     .set('Content-Type', 'application/json')
//     .set('Ocp-Apim-Subscription-Key', '286fe5360c85463bac4315dff365fdc2')
//     .set('Accept', 'application/json')
//     .end((err, res) => {
//       if (err || !res.ok) {
//         console.error(err);
//       } else {
//         alert(JSON.stringify(res.body));
//       }
//     });
// }

export default class Camera extends Component {
  constructor() {
    super();
    this.state = {
      imageLoaded: false,
      imageCanvasDisplay: 'none',
      clickedTheButton: false,
      spinnerDisplay: false,
      imageCanvasWidth: '28px',
      imageCanvasHeight: '320px',
      faceApiText: null,
      userData: '',
      personDetails: [],
      faceDataFound: false,
      currentImg: null
    };
    this.camera = null;
    this.photoCanvas = null;
    this.putImage = this.putImage.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
    this.faceIdentify = this.faceIdentify.bind(this);
    this.verifyFaces = this.verifyFaces.bind(this);
    this.getPersonDetails = this.getPersonDetails.bind(this);
  }


  putImage(img, orientation) {
    const canvas = this.photoCanvas;
    let w = img.width;
    let h = img.height;

    const {sw, sh} = resizeImage(w, h);
    let tempCanvas = document.createElement('canvas');
    let tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = sw;
    tempCanvas.height = sh;
    tempCtx.drawImage(img, 0, 0, sw, sh);
    ImageToCanvas.drawCanvas(canvas, img, orientation, sw, sh, 1, 0, false);
  }

  takePhoto(event) {
    let files = event.target.files,
      file;
    if (files && files.length > 0) {
      file = files[0];
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          getOrientation(file, (orientation) => {
            if (orientation < 0) orientation = 1;
            this.putImage(img, orientation);
            this.setState({imageLoaded: true, clickedTheButton: true, currentImg: img.src});
            this.faceIdentify();
          });
        }
      };

      fileReader.readAsDataURL(file);
    }
  }


  faceIdentify() {
    let canvas = this.photoCanvas;
    const dataURL = canvas.toDataURL();

    this.setState({
      spinnerDisplay: true,
      imageLoaded: false
    });

    // There's two ways to send images to the cognitive API.
    // 1. Send a Image URL (need to set Content-Type as application/json)
    // 2. Send a binary (need to set Content-Type as octet-stream). The image need to be serialized.
    request
      .post('https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false')
      .send(serializeImage(dataURL))
      .set('Content-Type', 'application/octet-stream')
      // .send({url: "http://techbeat.com/wp-content/uploads/2013/06/o-GOOGLE-FACIAL-RECOGNITION-facebook-1024x767.jpg"})
      // .set('Content-Type', 'application/json')
      .set('Ocp-Apim-Subscription-Key', '286fe5360c85463bac4315dff365fdc2')
      .set('processData', false)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          // TODO: error logging
          // console.error(err);
        } else {
          const faces = res.body.map(f => f.faceId);

          this.setState({
            faces
          });


          if (faces.length) {
            this.verifyFaces(faces);
          } else {
            this.setState({
              personDetails: [{userData: 'No faces found'}],
              spinnerDisplay: false,
              imageLoaded: true
            })
          }

        }
      });
  }


  verifyFaces(faces) {
    let canvas = this.photoCanvas;
    const ctx = canvas.getContext("2d");

    this.setState({
      imageLoaded: false
    });

    const body = {
      "personGroupId": "aspc2017facegroup",
      "faceIds": faces,
      "maxNumOfCandidatesReturned": 3,
      "confidenceThreshold": 0.5
    };
    // console.log(body);
    request
      .post('https://westus.api.cognitive.microsoft.com/face/v1.0/identify')
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Ocp-Apim-Subscription-Key', '286fe5360c85463bac4315dff365fdc2')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          // TODO: error logging
          // console.error(err);
        } else {
          if (res.body.length < 0) {
            this.setState({
              personDetails: [{userData: 'No match found'}],
              spinnerDisplay: false,
              imageLoaded: true
            })
          } else {
            if (res.body[0].candidates.length) {
              res.body.forEach(e => {
                this.getPersonDetails(e.candidates[0].personId);

                // ctx.fillStyle = "black";
                // ctx.globalAlpha = 0.4;
                // ctx.fillRect(e.faceRectangle.left, e.faceRectangle.top, e.faceRectangle.width, e.faceRectangle.height);
                // ctx.globalAlpha = 1.0;
              });

            } else {
              this.setState({
                personDetails: {userData: 'Face found, but it was not recognized'},
                spinnerDisplay: false,
                imageLoaded: true
              })

            }
          }
        }
      });
  }

  getPersonDetails(personId) {
    request
      .get('https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/aspc2017facegroup/persons/' + personId)
      .set('Ocp-Apim-Subscription-Key', '286fe5360c85463bac4315dff365fdc2')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          //TODO: error logging
          // console.error(err);
        } else {
          //RETURN PERSON DETAILS
          this.setState({
            personDetails: this.state.personDetails.concat(res.body),
            spinnerDisplay: false,
            imageLoaded: true
          });
        }
      });

  }


  render() {
    const canvasCSS = classNames({
      hidden: !this.state.imageLoaded,
      cameraFrame: true
    });

    const buttonCSS = classNames({
      hidden: this.state.clickedTheButton
    });

    const spinnerCSS = classNames({
      hidden: !this.state.spinnerDisplay
    });
    const innerSpinnerCSS = classNames({
      spinner: true
    });

    const addCSS = classNames({
      hidden: this.state.spinnerDisplay,
      metaInput: true

    });

    return <div>
      <h1 className="center light-color">IDENTIFY</h1>
      <div className="center">
        <div className={buttonCSS}>
          <label className="camera-snap">
            <img src="/assets/camera.svg" className="icon-camera"
                 alt="Click to snap a photo or select an image from your photo roll"/>
            <input type="file" label="Camera" onChange={this.takePhoto}
                   ref={node => this.camera = node} className="camera" accept="image/*"/>
          </label>
        </div>

        <div className={spinnerCSS}>
          <div className={innerSpinnerCSS}>
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>

        <div className={canvasCSS}>
          <canvas ref={node => {
            this.photoCanvas = node;
          }} className="imageCanvas">
            Your browser does not support the HTML5 canvas tag.
          </canvas>
        </div>

        <div className={addCSS}>
          <div className="personDetails">
            {this.state.personDetails.map(details => <div>
              <div><strong>{details.name}</strong></div>
              <div>
                <small>{details.userData ? details.userData : null}</small>
              </div>
            </div>)}
          </div>
        </div>

      </div>
    </div>
  }
}
