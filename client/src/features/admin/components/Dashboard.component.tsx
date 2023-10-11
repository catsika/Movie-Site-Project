import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  FormControl,
  Divider,
  Select,
  MenuItem,
  Input,
  InputAdornment,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import { ArrowBack, Check, Close } from "@mui/icons-material";
import "./MovieUploadStepper.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { selectedAdmin, upload, resetAdminState } from "../adminSlice";
import Chip from "@mui/material/Chip";

const steps = [
  "Select movie details",
  "Upload media files",
  "Review and submit",
];

const allGenres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Historical",
  "Horror",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
  "Western",
];

allGenres.sort();

export default function MovieUploadStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [movieTitle, setMovieTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [trailerFile, setTrailerFile] = useState<File | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);
  const dispatch = useAppDispatch();
  const admin = useAppSelector(selectedAdmin);

  const handleNext = () => {
    if (activeStep === 0 && !validateStepOne()) return;
    if (activeStep === 1 && !validateStepTwo()) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => {
    setActiveStep(0);
    setMovieTitle("");
    setSynopsis("");
    setRating(0);
    setPosterFile(null);
    setTrailerFile(null);
    setSelectedGenres([]);
    setSearchKeyword("");
    setReleaseDate(null);
    setDurationMinutes(0);
  };

  const uploadMovie = async (payload: any) => {
    const movie = await dispatch(upload(payload));
    return movie.payload;
  };

  const handleFinish = async () => {
    if (!validateStepThree()) return;

    const formData = new FormData();
    formData.append("title", movieTitle);
    formData.append("synopsis", synopsis);
    selectedGenres.forEach((genre, i) => {
      formData.append(`genre[${i}]`, genre);
    });

    formData.append(
      "releaseDate",
      releaseDate ? releaseDate.toISOString().split("T")[0] : ""
    );
    formData.append("duration", durationMinutes.toString());
    formData.append("rating", rating.toString());
    formData.append("poster", posterFile!);
    formData.append("trailer", trailerFile!);

    try {
      await uploadMovie(formData);
      setTimeout(() => {
        dispatch(resetAdminState());
        handleReset();
      }, 5000);
    } catch (error) {
      console.error("Upload failed:", error);
      setTimeout(() => {
        dispatch(resetAdminState());
        handleReset();
      }, 5000);
    }
  };

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    setFileState: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files && e.target.files[0];
    setFileState(file || null);
  };

  const handleGenreChange = (event: SelectChangeEvent<string | string[]>) => {
    setSelectedGenres(event.target.value as string[]);
  };

  const validateStepOne = () =>
    !!movieTitle && !!synopsis && selectedGenres.length > 0;

  const validateStepTwo = () => !!posterFile && !!trailerFile;

  const validateStepThree = () => {
    if (!releaseDate) return false;

    const ratingValue = parseFloat(rating.toString());
    if (isNaN(ratingValue)) return false;

    return ratingValue >= 0 && ratingValue <= 10;
  };

  const filteredGenres = allGenres.filter((genre) =>
    genre.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleGenreDelete = (genreToDelete: string) => {
    const newSelectedGenres = selectedGenres.filter(
      (genre) => genre !== genreToDelete
    );
    setSelectedGenres(newSelectedGenres);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div>
            <Typography
              variant="h6"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              Step 1: Select movie details
            </Typography>
            <div className="form-group">
              <TextField
                id="title"
                label="Movie Title"
                variant="outlined"
                fullWidth
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                style={{ marginBottom: "20px" }}
              />
            </div>
            <div className="form-group">
              <TextField
                id="synopsis"
                label="Synopsis"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                style={{ marginBottom: "20px" }}
              />
            </div>
            <div className="form-group">
              <FormControl variant="outlined" fullWidth>
                <Typography variant="body1">Genres</Typography>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {selectedGenres.map((genre) => (
                    <Chip
                      key={genre}
                      label={genre}
                      onDelete={() => handleGenreDelete(genre)}
                      variant="outlined"
                      style={{ margin: "2px", backgroundColor: "black" }}
                      color="primary"
                    />
                  ))}
                </div>
                <Select
                  multiple
                  value={selectedGenres}
                  onChange={handleGenreChange}
                  input={<Input />}
                  renderValue={() => null}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 224,
                        width: 250,
                      },
                    },
                  }}
                  style={{ marginBottom: "20px" }}
                >
                  {filteredGenres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <Typography
              variant="h6"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              Step 2: Upload media files
            </Typography>
            <div
              className="form-group upload-section"
              style={{ marginBottom: "20px" }}
            >
              <TextField
                id="poster"
                label="Poster"
                variant="outlined"
                fullWidth
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  accept: "image/jpeg,image/png,image/gif",
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFileUpload(e, setPosterFile)
                } // Change the event type here
              />
            </div>
            <div
              className="form-group upload-section"
              style={{ marginBottom: "20px" }}
            >
              <TextField
                id="trailer"
                label="Trailer"
                variant="outlined"
                fullWidth
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  accept: "video/mp4,video/webm,video/ogg",
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFileUpload(e, setTrailerFile)
                }
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <Typography
              variant="h6"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              Step 3: Review and submit
            </Typography>
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <div className="row" style={{ marginBottom: "20px" }}>
                <div className="col">
                  <TextField
                    id="releaseDate"
                    label="Release Date"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={
                      releaseDate ? releaseDate.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) =>
                      e.target.value
                        ? setReleaseDate(new Date(e.target.value))
                        : setReleaseDate(null)
                    }
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "20px" }}>
                <div className="col">
                  <TextField
                    id="durationMinutes"
                    label="Duration (Minutes)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                      endAdornment: (
                        <InputAdornment position="end">mins</InputAdornment>
                      ),
                    }}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "20px" }}>
                <div className="col">
                  <TextField
                    id="rating"
                    label="Rating (0-10)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    InputProps={{
                      inputProps: { min: 0, max: 10 },
                    }}
                    value={rating}
                    onChange={(e) => {
                      let value = Number(e.target.value);

                      if (isNaN(value)) {
                        value = 0;
                      } else if (value < 0) {
                        value = 0;
                      } else if (value > 10) {
                        value = 10;
                      }

                      setRating(value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Box className={`container ${admin.isUploading ? "blur" : ""}`}>
      {admin.isUploading && <div className="backdrop" />}

      <Box className="stepper-container">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Divider />
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography className="stepper-message" variant="body1">
              All steps completed - you're finished
            </Typography>
            <div className="stepper-actions">
              <Button
                variant="outlined"
                onClick={handleReset}
                style={{ color: "black", borderColor: "black" }}
              >
                Reset
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box>{renderStepContent(activeStep)}</Box>
            <Divider />
            <div className="stepper-actions">
              <Button
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack style={{ color: "black" }} />}
                style={{ color: "black", borderColor: "black" }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={
                  activeStep === steps.length - 1 ? handleFinish : handleNext
                }
                endIcon={
                  admin.isUploading ? (
                    <CircularProgress size={24} />
                  ) : admin.isSuccess === true ? (
                    <Check style={{ color: "gold" }} />
                  ) : admin.isError === true ? (
                    <Close style={{ color: "red" }} />
                  ) : null
                }
                style={{ backgroundColor: "white", color: "black" }}
                disabled={admin.isUploading}
              >
                {admin.isUploading
                  ? "Uploading..."
                  : admin.isSuccess
                  ? "Success"
                  : admin.isError
                  ? "Failed"
                  : activeStep === steps.length - 1
                  ? "Finish"
                  : "Next"}
              </Button>
            </div>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}
