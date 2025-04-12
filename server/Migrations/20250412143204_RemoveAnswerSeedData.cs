using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveAnswerSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DropColumn(
                name: "ContactId",
                table: "Answers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactId",
                table: "Answers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Answers",
                columns: new[] { "Id", "ContactId", "QuestionId", "Response", "SubmittedAt", "SurveyId", "SurveyResponseId" },
                values: new object[,]
                {
                    { 1, null, 3, "The Text Messages", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 0, null },
                    { 2, null, 3, "The iMessage like preview", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 0, null },
                    { 3, null, 3, "The Slack Opt-in Page", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 0, null },
                    { 4, null, 3, "Ease of Use", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 0, null },
                    { 5, null, 3, "The Survey itself", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 0, null },
                    { 6, null, 3, "N/A", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 0, null }
                });
        }
    }
}
