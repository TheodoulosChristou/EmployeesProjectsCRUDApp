namespace NCRApplicationAPI.Models
{
    /*
   * Project Class which containts these values:
   * Id as integer
   * ProjectName as String
   * ClientName as string
   * Duration as string
   * InitiationDate as DateTime
   * 
   */
    public class Project
    {
        public int Id { get; set; }

        public string ProjectName { get; set; } = string.Empty;

        public string ClientName { get; set; } = string.Empty;

        public string Duration { get; set; } = string.Empty;

        public DateTime InitiationDate { get; set; }
    }
}
