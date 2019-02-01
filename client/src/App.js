import React, { Component } from 'react'

import Uppy from '@uppy/core'
import Dashboard from '@uppy/react/lib/Dashboard'
import AwsS3 from '@uppy/aws-s3'

import './App.css'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { FileChecksum } from './file-checksum';

class App extends Component {
  constructor (props) {
    super(props)
    this.uppy = Uppy({
      allowMultipleUploads: false,
      debug: true
    }).use(AwsS3, {
      getUploadParameters: (file) => {
        return new Promise((resolve, reject) => {
          FileChecksum.create(file.data, (err, checksum) => {
            if (err) { return reject(err) }
            resolve(checksum)
          }, progress => {
            console.log('progress number:', progress);
          })
        }).then((checksum) => {
          const options = {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              "blob": {
                "filename": file.name,
                "content_type": file.type,
                "byte_size": file.size,
                "checksum": checksum
              }
            }),
            method: 'POST'
          }

          return fetch('http://localhost:3001/api/v1/files', options)
        }).then((res) => {
          return res.json()
        }).then((res) => {
          console.log('upload', res)

          return { url: res.direct_upload.url, method: 'PUT', fields: {}, headers: res.direct_upload.headers }
        })
      }
    })
  }

  componentWillUnmount () {
    this.uppy.close()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Dashboard proudlyDisplayPoweredByUppy={false} uppy={this.uppy} />
        </header>
      </div>
    );
  }
}

export default App;
