using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NCRApplicationAPI.Models;
using NCRApplicationAPI.Services.ProjectService;

namespace NCRApplicationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {

        //creates an projectService from Project Service Interface
        private readonly IProjectService _projectService;

        //Constructs a projectService from Project Service Interface
        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        /*
         * Method which fetch all the Projects from the Table Projects
         * into the Database.
         */
        [HttpGet]
        public async Task<ActionResult<List<Project>>> GetAllProjects()
        {
            var projects = await _projectService.GetAllProjects();
            return projects;
        }

        /*
         * Method which add projects into the Table Projects
         * and inform the Database.
        */
        [HttpPost]
        public async Task<ActionResult<List<Project>>> AddProject(Project project)
        {
            var projects = await _projectService.AddProject(project);
            return projects;
        }

        /*
         * Method which deletes projects from the Table Projects
         * and inform the Database.
        */
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Project>>> DeleteProject(int id)
        {
            var projects = await _projectService.DeleteProject(id);
            if (projects == null)
            {
               return NotFound("Project not found");
            }
            else
            {
                return Ok(projects);
            }
        }

        /*
         * Method which update a project from the Table Projects
         * and inform the Database.
        */
        [HttpPut]
        public async Task<ActionResult<List<Project>>> UpdateProject(Project project)
        {
            var projects = await _projectService.UpdateProject(project);
            if(projects == null)
            {
                return NotFound("Project not found");
            } else
            {
                return Ok(projects);
            }
        }

    }
}
