import React, { Component } from 'react';
import Api from "../Api";
import './MissionxFileUploader.css';

class MissionxFileUploader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: props.image || false,
            saving: ''
        }

        this.onFileInputChanged = this.onFileInputChanged.bind(this);
    }

    async onFileInputChanged(e){
        const file = e.target.files[0];
        if(file){
            this.setState({saving: true});
        }
        let response = await Api.upload(file, 'file');
        this.setState({ saving: false })
        if(response === false){
            this.setState({ 'image': `` });
        }else{
            this.setState({'image':response});
        }

        this.props.onUploadFinished(this.state.image);
    }

    getImage(image){
        if(image.substr(0,4).toLowerCase() === 'http'){
            return image;
        }
        return `https://files.mohammedmanssour.me/api/files/${image}`;
    }

    render() {
        return (
            <div className="missionx-file-uploader">
                <div className="uploader-wrapper">
                    <label className="file-input-label" htmlFor="file"></label>
                    <div className="plus-sign">
                        <svg enableBackground="new 0 0 1000 1000" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="m10 481.9h980v36.3h-980z" /><path d="m481.9 10h36.3v980h-36.3z" /></svg>
                    </div>

                    {this.state.saving &&
                    <div className="saving-wrapper">
                        Saving...
                    </div>}

                    {this.state.image &&
                    <div className="image-wrapper">
                        <img src={this.getImage(this.state.image)} className="img-responsive"/>
                    </div>
                    }
                </div>

                <input type="file" className="file-input" id="file" onChange={this.onFileInputChanged}/>
            </div>
        );
    }
}

export default MissionxFileUploader;