using Microsoft.EntityFrameworkCore;
using NCRApplicationAPI.Data;
using NCRApplicationAPI.Models;

namespace NCRApplicationAPI.Services.ProjectService
{
    public class ProjectService : IProjectService
    {

        //initialises a readable context
        private readonly DataContext _context;

        //constructs a context from DataContext
        public ProjectService(DataContext context)
        {   
            _context = context;
        }

        /*
         * Function which gets all the projects from 
         * the Database.
        */
        public async Task<List<Project>> GetAllProjects()
        {
            var projects = await _context.Projects.ToListAsync();
            return projects;
        }

        /*
         * Function which add project into 
         * the Database.
        */
        public async Task<List<Project>> AddProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return await _context.Projects.ToListAsync();
        }


        /*
         * Function which delete project into 
         * the Database.
        */
        public async Task<List<Project>> DeleteProject(int id)
        {
            var project = _context.Projects.Find(id);
            if (project == null)
            {
                return null;
            } else
            {
                _context.Projects.Remove(project);
                await _context.SaveChangesAsync();
                return await _context.Projects.ToListAsync();
            }

        }

        /*
         * Function which update project into 
         * the Database.
        */
        public async Task<List<Project>> UpdateProject(Project project)
        {
            var prj = await _context.Projects.FindAsync(project.Id);

            if(prj == null)
            {
                return null;
            } else
            {
                prj.ProjectName = project.ProjectName;
                prj.ClientName = project.ClientName;
                prj.Duration = project.Duration;
                prj.InitiationDate = project.InitiationDate.AddDays(+1);
                await _context.SaveChangesAsync();
                return await _context.Projects.ToListAsync();
            }
        }
    }
}
