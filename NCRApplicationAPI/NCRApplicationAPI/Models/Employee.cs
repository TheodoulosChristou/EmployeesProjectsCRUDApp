namespace NCRApplicationAPI.Models
{

    /*
     * Employee Class which containts these values:
     * Id as integer
     * Name as String
     * Surname as string
     * DateOfBirth as DateTime
     * PhoneNumber as string
     * Position as string
     * 
     */
    public class Employee
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Surname { get; set; } =string.Empty;

        public DateTime DateOfBirth { get; set; }

        public string PhoneNumber { get; set; } = string.Empty;

        public string Position { get; set; } = string.Empty;
    }
}
