<%
Dim sPath, Delimiter, DelimiterB, I, FormSize, FormData, iLocation, pFormData,Status
sPath = "./"
Delimiter = "--------------------"	'Flash传过来的分隔符
If Request.Servervariables("REQUEST_METHOD")="POST" Then
	On Error Resume Next
	For I = 1 To Len(Delimiter)
		DelimiterB = DelimiterB & ChrB(Asc(Mid(Delimiter, I, 1)))
	Next

	FormSize = Request.TotalBytes
	FormData = Request.BinaryRead(FormSize)
	iLocation = InStrB(1, FormData, DelimiterB)-1

	Dim oAdos : Set oAdos = CreateObject("Adodb.Stream")
		oAdos.Mode = 3
		oAdos.Type = 1
		oAdos.Open
		oAdos.Write(FormData)
		oAdos.Position = 0
		pFormData = oAdos.Read(iLocation)
		SaveLocalFile sPath & "avatar_110_135.jpg", pFormData
		oAdos.Position = iLocation+LenB(DelimiterB)
		pFormData = oAdos.Read
		SaveLocalFile sPath & "avatar.jpg", pFormData
		oAdos.Close
	Set oAdos = Nothing
	Thumbnail sPath & "avatar_110_135.jpg", 74, 90, sPath & "avatar_74_90.jpg"
	Thumbnail sPath & "avatar_110_135.jpg", 65, 80, sPath & "avatar_65_80.jpg"
	If Err.Number <> 0 Then
		Status = -1
	Else
		Status = 1
	End If
Else
	Status = -1
End If

Response.write("{""status"":" & Status & "}")
Response.End

Function SaveLocalFile(sFile, Data)
	Dim oAdos : Set oAdos = Server.CreateObject("ADODB.Stream")
	oAdos.Type = 1
	oAdos.Open
	oAdos.write Data
	oAdos.SaveToFile Server.Mappath(sFile), 2
	oAdos.Close
	Set oAdos = Nothing
End Function

Function Thumbnail(sFile, iWidth, iHeight, sToFile)
	Dim oJpeg : Set oJpeg = Server.CreateObject("Persits.Jpeg")
		oJpeg.Open Server.MapPath(sFile)
		oJpeg.Width = iWidth
		oJpeg.Height = iHeight
		oJpeg.Save Server.MapPath(sToFile)
	Set oJpeg = Nothing
End Function
%>