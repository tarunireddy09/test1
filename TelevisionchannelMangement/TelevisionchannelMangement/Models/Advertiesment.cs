namespace TelevisionchannelMangement.Models
{
  
        public class Advertiesment
        {
            public int AdvertisementId { get; set; }
            public string? Title { get; set; }
            public string? ClientName { get; set; }
            public DateTime? ScheduledDate { get; set; }  
            public int? Duration { get; set; }  
            public decimal? Rate { get; set; }  
            public string? AssignedSubcategory { get; set; }
            public string? Status { get; set; }
            public DateTime? CreatedAt { get; set; }
            public DateTime? UpdatedAt { get; set; }
        public int UserId { get; set; }

    }

    



}
