/* eslint-disable react/prop-types */
import { useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

const AutoCompleteDropdown = ({
  label,
  fetchOptions,
  selectedValue,
  setSelectedValue,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleDropdownOpen = async () => {
    if (options.length === 0) {
      // Avoid refetching if options are already loaded
      setLoading(true);
      try {
        const data = await fetchOptions(inputValue);
        setOptions(data);
      } catch (error) {
        console.error("Failed to load options:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  console.log(options);

  return (
    <Autocomplete
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.label || ""}
      value={selectedValue}
      onChange={(event, newValue) => setSelectedValue(newValue)}
      inputValue={inputValue}
      onInputChange={(event, newValue) => setInputValue(newValue)}
      onOpen={handleDropdownOpen} // Trigger API call when dropdown opens
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AutoCompleteDropdown;
