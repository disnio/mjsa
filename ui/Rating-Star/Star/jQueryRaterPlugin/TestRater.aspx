<%@ Page Language="C#" AutoEventWireup="true" EnableSessionState="False" EnableViewState="False" EnableViewStateMac="False"
    Title="jQuery Rater Plugin Demo Test Handler" %>
<script runat="server">
public void Page_Load(object sender, EventArgs e)
{
	const float RATING = 7;
	const float COUNT = 2;
	Response.ContentType = "text/plain";
	try
	{
		if (Request.QueryString["error"] == "true")
			throw new Exception("Error rating entry! This is a simulated error message created at the server.");

		float rating = RATING + float.Parse(Request.Form["rating"]);
		float result = rating / (COUNT + 1); 
		Response.Write(result.ToString("0.0"));
	}
	catch (Exception ex)
	{
		Response.StatusCode = 202;
		Response.Write(ex.Message);
		Response.Flush();
		Response.End();
	}
}
</script>