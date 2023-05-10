using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using NCRApplicationAPI.Models;
using NCRApplicationAPI.Services.EmployeeService;

namespace NCRApplicationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        //creates an employeeService from Employee Service Interface
        private readonly IEmployeeService _employeeService;

        //Constructs an employeeService from Employee Service Interface
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }


        /*
         * Method which fetch all the Employees from the Table Employees
         * into the Database.
         */
        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAllEmployees()
        {
            var employees = await _employeeService.GetAllEmployees();
            return (employees);
        }

        /*
         * Method which add employees into the Table Employees
         * and inform the Database.
         */
        [HttpPost]
        public async Task<ActionResult<List<Employee>>> AddEmployee(Employee employee)
        {
            var employees = await _employeeService.AddEmployee(employee);
            return Ok(employees);
            
        }

        /*
         * Method which deletes employees from the Table Employees
         * and inform the Database.
         */

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Employee>>> DeleteEmployee(int id)
        {
            var result = await _employeeService.DeleteEmployee(id);
            if(result == null)
            {
                return NotFound("Employee Not Found");
            } else
            {
                return Ok(result);
            }
        }

        /*
         * Method which gets an employee from the Table Employees
         * and inform the Database.
         */
        [HttpGet("{id}")]
        public async Task <ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _employeeService.GetEmployee(id);

            if(employee == null)
            {
                return NotFound("Employee Not Found");
            } else {
                return Ok(employee); 
            }
        }

        /*
         * Method which update an employee from the Table Employees
         * and inform the Database.
         */
        [HttpPut]
        public async Task<ActionResult<List<Employee>>> UpdateEmployee(Employee employee)
        {
            var emp = await _employeeService.UpdateEmployee(employee);
            if (emp == null)
            {
                return NotFound("Employee not found");
            }
            else
            {
                return Ok(emp);
            }
        } 
    }
}
