import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import fetchCategory from "./fetchCategory";

const CategoryDetails = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const results = useQuery(["details", id], fetchCategory);
  console.log(id);
  if (results.isError) {
    return (
      <div className="error-pane">
        <h2>There was an error. Please try again.</h2>
      </div>
    );
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">↻</h2>
      </div>
    );
  }

  const category = results.data;
  return (
    <div className="details">
      <h2>{category.name}</h2>
      <h3>{category.createdTime.toString()}</h3>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <CategoryDetails {...props} />
    </ErrorBoundary>
  );
}
export default DetailsWithErrorBoundary;
