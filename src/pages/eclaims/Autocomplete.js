

// export default AutocompleteComponent;
import React, { Component } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

class AutocompleteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      loading: false,
      selectedOptions: [] // Track selected options
    };
  }

  // Function to fetch data from the API
  fetchData = async (searchTerm) => {
    try {
      this.setState({ loading: true });
      const response = await axios.get(`http://localhost:3000/icdCodes/autocompletes?term=${searchTerm}`);
      const data = response.data;
      if (Array.isArray(data)) {
        this.setState({ options: data });
      } else {
        this.setState({ options: [] });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  // Function to handle input change
  handleInputChange = (event, value) => {
    if (value) {
      this.fetchData(value);
    } else {
      this.setState({ options: [] });
    }
  };

  // Function to handle option selection
  handleOptionChange = (event, value) => {
    if (value) {
      this.setState(prevState => ({
        selectedOptions: [...prevState.selectedOptions, value]
      }));
    }
  };

  // Function to handle option removal
  handleOptionRemoval = (index) => {
    this.setState(prevState => ({
      selectedOptions: prevState.selectedOptions.filter((_, i) => i !== index)
    }));
  };

  render() {
    const { options, loading, selectedOptions } = this.state;

    return (
      <div>
        <Autocomplete
          freeSolo
          options={options}
          loading={loading}
          getOptionLabel={(option) => option.description}
          onInputChange={this.handleInputChange}
          onChange={this.handleOptionChange} // Handle option selection
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              value={params.inputProps.value}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? 'Loading...' : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />

        {selectedOptions.map((option, index) => (
          <div key={index}>
            <TextField
              label={`Other Field ${index + 1}`}
              value={option.icd_10_code}
              disabled
            />
            <TextField
              label={`Other Field ${index + 1}`}
              value={option.description}
              disabled
            />
            <TextField
              label={`Other Field ${index + 1}`}
              value={option.group}
              disabled
            />
            <TextField
              label={`Other Field ${index + 1}`}
              value={option.description}
              disabled
            />
            <TextField
              label={`Other Field ${index + 1}`}
              value={option.case_rate}
              disabled
            />
            <TextField
              label={`Other Field ${index + 1}`}
              value={option.professional_fee}
              disabled
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => this.handleOptionRemoval(index)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    );
  }
}

export default AutocompleteComponent;
