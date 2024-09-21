import React, { Component } from 'react';

class XMLEncryptor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xmlData: '', // XML data to be encrypted
      encryptedData: '' // Encrypted data will be stored here
    };
  }

  // Function to encrypt XML data
  encryptXML = () => {
    const { xmlData } = this.state;

    // Your encryption logic goes here
    // For demonstration purposes, let's just set encryptedData to the original XML data
    const encryptedData = `Encrypted: ${xmlData}`;

    // Update state with encrypted data
    this.setState({ encryptedData });
  }

  // Function to handle changes in the XML data input
  handleXMLInputChange = (e) => {
    this.setState({ xmlData: e.target.value });
  }

  render() {
    const { xmlData, encryptedData } = this.state;

    return (
      <div>
        <h2>XML Encryptor</h2>
        <div>
          <textarea
            placeholder="Enter XML data here..."
            value={xmlData}
            onChange={this.handleXMLInputChange}
            style={{ width: '100%', height: '200px' }}
          />
        </div>
        <button onClick={this.encryptXML}>Encrypt XML</button>
        <div>
          <h3>Encrypted Data:</h3>
          <textarea
            value={encryptedData}
            readOnly
            style={{ width: '100%', height: '200px' }}
          />
        </div>
      </div>
    );
  }
}

export default XMLEncryptor;
