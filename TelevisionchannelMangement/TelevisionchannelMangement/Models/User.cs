﻿using System;
using System.Collections.Generic;

namespace TelevisionchannelMangement.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public int RoleId { get; set; }

    public string? Email { get; set; }

    
}
