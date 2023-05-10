using NCRApplicationAPI.Models;

namespace NCRApplicationAPI.Services.ProjectService
{
    /*
    * Project Service Interface which
    * initialises CRUD methods for Projects.
    * 
    */
    public interface IProjectService
    {
        Task<List<Project>> GetAllProjects();

        Task<List<Project>> AddProject(Project project);

        Task<List<Project>> DeleteProject(int id);

        Task<List<Project>> UpdateProject(Project project);
    }
}
