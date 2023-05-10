using Microsoft.EntityFrameworkCore;
using NCRApplicationAPI.Models;

namespace NCRApplicationAPI.Data
{
    /*
     * DataContext Class which connects our backend 
     * to the SQL Server Database and stores Employees and Projects
     * to separate Tables.
     * 
   */
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options):base(options) { 
        
        }

        /*
         * Method which initialize the connection to SQL Server Database
         * 
         */
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=employeedb;Trusted_Connection=true;TrustServerCertificate=true;");
        }

        //Table for Employees into Database
        public DbSet<Employee> Employees { get; set; }

        //Table for Projects into Database
        public DbSet<Project> Projects { get; set; }

    }
}
