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
    return (<p>Error: {error.message}</p>);
  }

  //question if i am using a hook then why i need again to check isloading and error here?
  //cz the hook is not handling rendering. it only provide data and state


  return (
    <>
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
        {/* console.log(projectData); */}
        {/* render projects */}
        {projects.map((projectData, index) => {
          return <ProjectCard key={index} projectData={projectData} />
        })}
      </div>
    </>
  );
}

export default HomePage;
