import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, MenuItem, Select, Typography, Box, CircularProgress } from "@mui/material";
import { getAbstract, saveScore } from "../api/management";


const criteria = [
  "Novelty of research",
  "Relevance to the field",
  "Clarity",
  "Coherence",
  "Study design",
  "Significance of result",
  "Clinical implication",
  "Replicability"
];

export default function AbstractReview() {
  const { id } = useParams();
  const [ratings, setRatings] = useState({});
  const [abstractData, setAbstractData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getAbstract(id)
      setAbstractData(response.detail.data)
    }
    if (id) {
      getData()
    }
  }, [id]);

  const handleDownload = () => {
    if (abstractData && abstractData.startsWith("data:")) {
      const [metadata, base64] = abstractData.split(",");
      const contentType = metadata.split(":")[1].split(";")[0];

      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `abstract_${id}.${contentType.split("/")[1]}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  const handleRatingChange = (criterion, value) => {
    setRatings((prev) => ({ ...prev, [criterion]: parseInt(value) }));
  };

  const handleSubmit = async () => {
    setLoading(true); // Show loading spinner
    //if count of the key value pairs in ratings is less than 8, then show an error
    if (Object.keys(ratings).length < 8) {
      alert("Please rate all the criteria");
      return;
    }
    // I also want to sum all the scores from the rating key value pair,     
    const sum = Object.values(ratings).reduce((acc, curr) => acc + curr, 0);
    // Then add a key value pair as sum and sum value to the rating
    ratings.sum = sum;

    console.log("Submitted Ratings:", JSON.stringify(ratings));
    const data = { "manuscript_id": id, "score": ratings }

    const response = await saveScore(data)
    alert(response.detail.message);


    // remove sum after submition
    delete ratings.sum;
    setLoading(true); // Show loading spinner
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="white" padding={4}>
      <Card sx={{ maxWidth: 500, padding: 3, border: "1px solid #ccc", boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Review Abstract
          </Typography>
          <Box textAlign="center" mb={4}>
            <Button variant="contained" color="primary" onClick={handleDownload}>
              Download Abstract
            </Button>
          </Box>
          <Box>
            {criteria.map((criterion) => (
              <Box key={criterion} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="body1" sx={{ flex: 1, marginRight: "10px" }}>{criterion}</Typography>
                <Select
                  value={ratings[criterion] || ""}
                  onChange={(event) => handleRatingChange(criterion, event.target.value)}
                  displayEmpty
                  sx={{ minWidth: 80 }}
                >
                  {[...Array(10).keys()].map((num) => (
                    <MenuItem key={num + 1} value={num + 1}>
                      {num + 1}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            ))}
          </Box>
          <Box mt={4} textAlign="center">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}  // Disable button while loading
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Review"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

}
