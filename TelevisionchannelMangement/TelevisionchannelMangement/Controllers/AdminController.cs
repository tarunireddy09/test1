using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using TelevisionchannelMangement.Models;

namespace TelevisionchannelMangement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        SqlConnection cons = new SqlConnection("Server=DESKTOP-M84CVIT\\SQLEXPRESS;Initial Catalog=ChannelManagementDb;Integrated Security=True;Trusted_Connection=True;TrustServerCertificate=true;");


        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Content> GetContentmaster()
        {
            List<Content> lstyearmaster = new List<Content>();


            {
                SqlCommand command = new SqlCommand("Select * From Content", cons);

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();

                cons.Open();
                SqlDataReader rdr = command.ExecuteReader();

                while (rdr.Read())
                {

                    Content content = new Content();
                    content.ContentId = rdr["ContentId"].ToString();
                    content.ShowId = rdr["ShowId"].ToString();
                    content.EpisodeNumber = rdr["EpisodeNumber"].ToString();
                    content.Title = rdr["Title"].ToString();
                    content.AirDate = rdr["AirDate"].ToString(); 
                    content.EditorId = rdr["EditorId"].ToString();
                    content.Status = rdr["Status"].ToString();



                    lstyearmaster.Add(content);
                }
                cons.Close();
            }

            return lstyearmaster;
        }

        private readonly string _connectionString = "Server=DESKTOP-M84CVIT\\SQLEXPRESS;Initial Catalog=ChannelManagementDb;Integrated Security=True;Trusted_Connection=True;TrustServerCertificate=true;"; // Replace with your actual connection string


        [HttpGet]
        [Route("[action]")]
        public async Task<string> PostContentAsync(Content content)
        {

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                string checkShowExistsQuery = "SELECT COUNT(1) FROM Shows WHERE ShowId = @ShowId";
                using (SqlCommand checkCommand = new SqlCommand(checkShowExistsQuery, connection))
                {
                    checkCommand.Parameters.AddWithValue("@ShowId", content.ShowId);

                    int showCount = (int)await checkCommand.ExecuteScalarAsync();
                    if (showCount == 0)
                    {
                        return "ShowId does not exist in the Shows table."; 
                    }
                }

                string insertQuery = "INSERT INTO Content (ShowId, EpisodeNumber, Title, AirDate, EditorId, Status) " +
                                     "VALUES (@ShowId, @EpisodeNumber, @Title, @AirDate, @EditorId, @Status);";

                using (SqlCommand insertCommand = new SqlCommand(insertQuery, connection))
                {
                    insertCommand.Parameters.AddWithValue("@ShowId", content.ShowId);
                    insertCommand.Parameters.AddWithValue("@EpisodeNumber", content.EpisodeNumber);
                    insertCommand.Parameters.AddWithValue("@Title", content.Title);
                    insertCommand.Parameters.AddWithValue("@AirDate", content.AirDate);
                    insertCommand.Parameters.AddWithValue("@EditorId", content.EditorId);
                    insertCommand.Parameters.AddWithValue("@Status", content.Status);

                    await insertCommand.ExecuteNonQueryAsync(); 
                }

                return "Content added successfully."; 
            }
        }


        [HttpPut]
        [Route("[action]")]
        public void UpdateContent(Content content)
        {
          
                SqlCommand command = new SqlCommand("Update component_type_master set  ShowId=@ShowId,  EpisodeNumber=@EpisodeNumber, Title=@Title,AirDate=@AirDate, EditorId=@EditorId, Time=@Time, Status=@Status where ContentId= @ContentId", cons);


               
                {
                    
                    command.Parameters.AddWithValue("@ContentId", content.ContentId);
                    command.Parameters.AddWithValue("@ShowId", content.ShowId);
                    command.Parameters.AddWithValue("@EpisodeNumber", content.EpisodeNumber);
                    command.Parameters.AddWithValue("@Title", content.Title);
                    command.Parameters.AddWithValue("@AirDate", content.AirDate);
                    command.Parameters.AddWithValue("@EditorId", content.EditorId);
                    command.Parameters.AddWithValue("@Status", content.Status);

                 
                    command.ExecuteNonQuery();
                }
            }
        



        [HttpDelete]
        [Route("[action]")]

        public async Task<IActionResult> DeleteContenetmaster( string ContentId)
        {
            
            SqlCommand command = new SqlCommand("Delete From Content where ContentId=@ContentId", cons);

            command.Parameters.AddWithValue("@ContentId", ContentId);
            


            cons.Open();
            command.ExecuteNonQuery();
            cons.Close();

            return Ok(ContentId);
        }



    }
}
