import useProjects from "../../hooks/use-projects";
import ProjectCard from "../../components/ProjectCard";
import "./HomePage.css";
import dropimage from "../../assets/drop1.jpeg";

function HomePage() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (<p>loading...</p>);
  }

  if (error) {
    return (<p>{error.message}</p>);
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <img src={dropimage} alt="drop image" className="hero-image" />
        <div className="hero-text">
          <h1> In Drops to Ocean every drop counts</h1>
          <p>Empowering your skills and growth through projects and learning.</p>
        </div>
      </div>

      {/* Project List Section */}
      <div id="project-list">
        <h1> Featured projects</h1>
        {projects.map((projectData, index) => (
          <ProjectCard key={index} projectData={projectData} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
