using System;
using System.Collections.Generic;

namespace TelevisionchannelMangement.Models;

public partial class Content
{
    internal int id;

    public string ContentId { get; set; }

    public string ShowId { get; set; }

    public string EpisodeNumber { get; set; }

    public string Title { get; set; } = null!;

    public string AirDate { get; set; }

    public string EditorId { get; set; }

    public string Status { get; set; } = null!;

   public virtual Show Show { get; set; } = null!;
}
