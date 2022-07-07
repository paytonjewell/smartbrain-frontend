import React from 'react';

function ImageLinkForm({onInputChange, onSubmit}) {
    return (
        <div>
            <p className="f3 pa2">
                This Magic Brain will detect faces in your images. Give it a try!
            </p>
            <div className={'pa4 br3 center'}>
                <input className={'f4 pa3 w-50-m w-40-ns center br4 br--left-ns bn'} type="text"
                       placeholder={'Image URL'} onChange={onInputChange}/>
                <button onClick={onSubmit}
                    className={'w-10-ns w-30-m shadow-hover f4 link pa3 dib white bg-light-purple br4 br--right-ns bn pointer'}>Detect
                </button>
            </div>
        </div>
    );
}

export default ImageLinkForm;