namespace server.Models{
    public class SurveyResponse
    {
        public string Id { get; set; }
        public string SurveyId { get; set; }  // Links to which survey
        public string ContactId { get; set; }  // Who answered it
        public List<Answer> Answers { get; set; }  // Their answers
        public DateTime StartedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
}