using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SA_DbContext.Migrations
{
    public partial class ChangeName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prices_Prodcts_ProductId",
                table: "Prices");

            migrationBuilder.DropForeignKey(
                name: "FK_Prodcts_ProductTypes_ProductTypeId",
                table: "Prodcts");

            migrationBuilder.DropForeignKey(
                name: "FK_Sales_Prodcts_ProductId",
                table: "Sales");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Prodcts",
                table: "Prodcts");

            migrationBuilder.RenameTable(
                name: "Prodcts",
                newName: "Products");

            migrationBuilder.RenameIndex(
                name: "IX_Prodcts_ProductTypeId",
                table: "Products",
                newName: "IX_Products_ProductTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Prices_Products_ProductId",
                table: "Prices",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeId",
                table: "Products",
                column: "ProductTypeId",
                principalTable: "ProductTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sales_Products_ProductId",
                table: "Sales",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prices_Products_ProductId",
                table: "Prices");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Sales_Products_ProductId",
                table: "Sales");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "Prodcts");

            migrationBuilder.RenameIndex(
                name: "IX_Products_ProductTypeId",
                table: "Prodcts",
                newName: "IX_Prodcts_ProductTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Prodcts",
                table: "Prodcts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Prices_Prodcts_ProductId",
                table: "Prices",
                column: "ProductId",
                principalTable: "Prodcts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Prodcts_ProductTypes_ProductTypeId",
                table: "Prodcts",
                column: "ProductTypeId",
                principalTable: "ProductTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sales_Prodcts_ProductId",
                table: "Sales",
                column: "ProductId",
                principalTable: "Prodcts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
