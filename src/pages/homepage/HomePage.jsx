import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";
import drop from "../assets/drop-into-ocean.jpg";

function HomePage() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (<p>loading...</p>);
  }

  if (error) {
    return (<p>{error.message}</p>);
  }

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <img src={drop} alt="a drop falling to ocean" className="hero-image" />
        <div className="hero-text">
          <h1> In Drops2Ocean every drop counts </h1>
          <p>Empowering your skills and growth through projects and learning.</p>
        </div>
      </div>

      {/* Project List Section  */}
      <div id="project-list">
        <h1> Featured Projects</h1>

        {projects.map((projectData, key) => {
          <ProjectCard key={key} projectData={projectData} />;
        })}
      </div>
    </>
  );
}

export default HomePage;
