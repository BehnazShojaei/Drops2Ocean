import useProjects from "../../hooks/use-projects";
import ProjectCard from "../../components/ProjectCard";
import "/src/pages/homepage/HomePage.css";

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
        <img src="/path-to-your-image.png" alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h1> to Our Projects</h1>
          <p>Empowering your skills and growth through projects and learning.</p>
        </div>
      </div>

      {/* Project List Section */}
      <div id="project-list">
        {projects.map((projectData, index) => (
          <ProjectCard key={index} projectData={projectData} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
