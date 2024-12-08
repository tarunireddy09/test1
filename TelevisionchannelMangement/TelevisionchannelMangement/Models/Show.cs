using System;
using System.Collections.Generic;

namespace TelevisionchannelMangement.Models;

public partial class Show
{
    public int ShowId { get; set; }

    public string Title { get; set; } = null!;

    public string Genre { get; set; } = null!;

    public int Duration { get; set; }

    public DateTime Schedule { get; set; }

    public double? Rating { get; set; }

    public int ProducerId { get; set; }

    public int UserId { get; set; }
    public string Status { get; set; } = "Pending";


   
}
