import React, { Component } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

class URLUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [], // Array to store uploaded URLs
      newUrl: '', // Current URL input value
      error: '' // Error message, if any
    };
  }

  // Function to handle changes in the URL input
  handleURLChange = (e) => {
    this.setState({ newUrl: e.target.value });

    
    // console.log(
    //   JsonToXml(
    //     // { CF1: '', CF2: 2,  attr: this.state.itemcf1 },

    //     // <eCLAIMS> mga lamn </eCLAIMS>
    //     // { eCLAIMS:  {
    //     //   eTRANSMITTAL: {Claim:'2'  ,  attr:  this.state.claim    },  attr: { b: 2, c: 3 }
    //     //  },
    //     // attr:  this.state.eCLAIMS },
    //     // { attributes_key: 'attr' }
    //     // ));

    //     {
    //       eCLAIMS: {
    //         eTRANSMITTAL: {
    //           CLAIM: [
    //             { CF1: "", attr: this.state.itemcf1 },
    //             {
    //               CF2: [{ a: 1, attr: { b: 2, c: 3 } }],
    //               attr: this.state.itemcf2,
    //             },
    //           ],
    //           attr: this.state.claim,
    //         },
    //         attr: this.state.eTRANSMITTAL,
    //       },
    //       attr: this.state.eCLAIMS,
    //     },
    //     { attributes_key: "attr" }
    //   )
    // );
  }

  // Function to add a new URL to the list
  addURL = () => {
    const { newUrl, urls } = this.state;

    // Check if the URL is empty
    if (!newUrl.trim()) {
      this.setState({ error: 'Please enter a valid URL' });
      return;
    }

    // Add the new URL to the list
    this.setState({
      urls: [...urls, newUrl],
      newUrl: '', // Clear the input field
      error: '' // Clear any previous error message
    });
  }

  render() {
    const { urls, newUrl, error } = this.state;

    return (
      <div>
        <h4> Upload URL Document</h4>
        <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                type="text"
                fullWidth
                size="small"
                placeholder="Enter URL..."
                value={newUrl}
                onChange={this.handleURLChange}
              />
              
        </Grid> 
        <Grid item xs={2}>
          <Button
          
          variant="contained"
          color="success"
          onClick={this.addURL}>Add URL</Button>
        </Grid>
        </Grid>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <h3>Document  URL Link:</h3>
          <ul>
            {urls.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default URLUploader;
