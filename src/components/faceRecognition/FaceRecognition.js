import React from 'react';
import "./FaceRecognition.css"

function FaceRecognition({imageUrl, box}) {
    return (
        <div className={'center ph3 flex justify-center'}>
            <div className="absolute">
                <img id={'inputImage'} src={imageUrl} alt="" width={500} height={'auto'}/>
                <div className="bounding-box"
                     style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}/>
            </div>
        </div>
    );
}

export default FaceRecognition;