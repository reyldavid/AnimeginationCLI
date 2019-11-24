/**
* Created by reynaldodavid on 11/22/19.
*/
import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from "../globals";
import { HttpHelper } from './http.helper.service';
import { ServiceName } from '../models/service';
import { ApiProduct } from '../models/product';
import { Category } from '../models/category';
import { ApiProductsCache, CategoryCache, CategoriesCache } from '../models/dictionary';
import { TokenModel } from '../models/tokenmodel';
import { MessageService } from '../services/message.service';
import { Employment, Education } from '../models/employment';

@Injectable({
    providedIn: 'root'
  })
  export class EmploymentService {

    private _employments: Employment[] = [];

    CoverIntro: string = "A ".concat("highly accomplished Senior Software Engineer ",
        "/ Software Architect with thirty (30) years of results-driven experience, ",
        "with particular expertise in Angular, C#, Asp.Net Web API, ",
        "SQL Server and Oracle, Asp.Net MVC, TypeScript, Windows 8 App development, ",
        "and extensive work experience with Microsoft Azure, AWS, Google Cloud, ",
        "the .NET Framework, the Entity Framework, jQuery, Docker, and high proficiency ", 
        "in Hybrid Mobile App development, seeking a challenging opportunity ",
        "that would utilize advanced technologies in a fast-paced environment");

    Blog: string = "Visit ".concat("Rey David's Developers Blog at ",
        "<a href='http://davidsdotnetlines.blogspot.com' ",
        "target='_blank'>http://DavidsDotNetLines.BlogSpot.com</a> ",
        "for tips and tricks on Angular, Asp.Net, SQL Server, IIS and Https, ",
        "Windows 8 App development, and much more. ",
        "<a href='http://davidsdotnetlines.blogspot.com' ",
        "target='_blank'>Check it out now.</a> ");

    get Employments(): Employment[] {
        return this._employments;
    }

    get Educations(): Education[] {
        let educ1: Education = {
            EducationId: 1,
            SchoolName: "De La Salle University",
            Degree: "BS, Computer Science",
            FromTo: "1983 - 1987",
            Activities: "Activities and Societies: Forensic Society (public speaking), Chess Club"
        }
        return [educ1];
    }

    constructor(private globals: Globals, 
        private helper: HttpHelper, 
        private messageService: MessageService) {

            let emp1: Employment = {
                EmploymentId: 1,
                EmployerName: "Unisys Corporation",
                EmployerImage: "Unisys.png",
                EmployerLocation: "Blue Bell, PA",
                EmploymentTitle: "Project Coordinator",
                EmploymentFrom: "1989",
                EmploymentTo: "1991",
                EmployerUrl: "www.unisys.com",
                Details: []
            }

            let emp2: Employment = {
                EmploymentId: 2,
                EmployerName: "City of Hayward",
                EmployerImage: "Hayward.jpg",
                EmployerLocation: "Hayward, CA",
                EmploymentTitle: "Systems Analyst and Programmer",
                EmploymentFrom: "1991",
                EmploymentTo: "1997",
                EmployerUrl: "www.hayward-ca.gov",
                Details: []
            }

            let emp3: Employment = {
                EmploymentId: 3,
                EmployerName: "ProBusiness Services",
                EmployerImage: "Employer.png",
                EmployerLocation: "Pleasanton, CA",
                EmploymentTitle: "Senior Software Engineer",
                EmploymentFrom: "1997",
                EmploymentTo: "2002",
                EmployerUrl: "",
                Details: []
            }

            let emp4: Employment = {
                EmploymentId: 4,
                EmployerName: "IndyMac Bank",
                EmployerImage: "Employer.png",
                EmployerLocation: "Pasadena, CA",
                EmploymentTitle: "Senior Software Developer / Analyst",
                EmploymentFrom: "2003",
                EmploymentTo: "April 2004",
                EmployerUrl: "",
                Details: []
            }

            let emp5: Employment = {
                EmploymentId: 5,
                EmployerName: "Audatex",
                EmployerImage: "Employer.png",
                EmployerLocation: "San Ramon, CA",
                EmploymentTitle: "Senior Software Engineer / Security and Architecture",
                EmploymentFrom: "Apr 2004",
                EmploymentTo: "Oct 2007",
                EmployerUrl: "www.audatex.com",
                Details: [
                    "Designed".concat(", built and maintained the next generation of Audatex’s “Claims Manager”, ",
                    "the company’s web-based automotive insurance claims management solution.  ",
                    "This application was built using C#, ASP.NET, ASP, VB6, XML and an Oracle back-end, ",
                    "and connects clients with internal and external partners alike, exchanging and ",
                    "managing a steady flow of insurance claims information in real time")
                ]
            }

            let emp6: Employment = {
                EmploymentId: 6,
                EmployerName: "Mapfre Insurance",
                EmployerImage: "Mapfre.jpg",
                EmployerLocation: "Pleasanton, CA",
                EmploymentTitle: "Software Applications Architect",
                EmploymentFrom: "Dec 2007",
                EmploymentTo: "Apr 2011",
                EmployerUrl: "www.mapfreinsurance.com",
                Details: [
                    "Modernized ".concat("the IT Department’s software assets and technology base, bringing ",
                    "it out of a FoxPro- and ColdFusion-based platform to a Microsoft .NET-centric platform."),
                    "Architected ".concat("and built the company’s various web applications, leveraging ",
                    "the latest technologies in ASP.NET 3.5, C# 2008, jQuery, AJAX, Silverlight 3, WCF, ",
                    "ASP.NET MVC, and SQL Server 2005."),
                    "Received ".concat("the prestigious 2009 IT People’s Choice Award, presented to me ",
                    "during the annual IT Meeting in Webster, Massachusetts, attended by 400 IT professionals")
                ]
            }

            let emp7: Employment = {
                EmploymentId: 7,
                EmployerName: "Workers Compensation Insurance Rating Bureau",
                EmployerImage: "WCIRB.jpg",
                EmployerLocation: "San Francisco, CA",
                EmploymentTitle: "Senior Applications Architect",
                EmploymentFrom: "Apr 2011",
                EmploymentTo: "Feb 2013",
                EmployerUrl: "www.wcirb.com",
                Details: [
                    "Architected ".concat("and developed the Data and Document Delivery System for ",
                    "the 2012 Experience Rating Plan project.  This project included a new ETL process ",
                    "for the legacy data; and new services to dynamically generate, store, print, ",
                    "and deliver PDF documents of rate sheets.  Development tools included C# 2010, ",
                    "SQL Server 2008 R2, and Microsoft TFS."),
                    "Introduced ".concat("current technology and software architecture trends and ",
                    "best practices to the organization, supervised the technical consultants, and ",
                    "mentored junior software developers"),
                    "Architected ".concat("and developed the public-facing Coverage Information website ",
                    "used to verify workers compensation insurance coverage by employers doing business ",
                    "in California.  Development tools include  ASP.NET 4.0, jQuery, SQL Server 2008 R2, ",
                    "Microsoft TFS, and Sharepoint 2010. https://www.caworkcompcoverage.com "),
                    "Led ".concat("the development team in the enhancement projects for two of the company’s ",
                    "most important websites, the corporate website at https://wcirbonline.org/Wcirb/ and ",
                    "the aggregate financial data submission website at https://wcirbonline.org/Actuarial ")
                ]
            }

             let emp8: Employment = {
                EmploymentId: 8,
                EmployerName: "GE, Global Research Center of Excellence",
                EmployerImage: "GE.png",
                EmployerLocation: "San Ramon, CA",
                EmploymentTitle: "Consultant",
                EmploymentFrom: "Mar 2013",
                EmploymentTo: "Aug 2013",
                EmployerUrl: "www.ge.com",
                Details: [
                    "Designed ".concat("and built a Microsoft WCF RESTful Web Service that served as ",
                    "the communication layer between OPC (Open Platform Communications) servers and web applications."),
                    "Enhanced ".concat("a Performance Diagnostics application for manufacturing equipment ",
                    "using Microsoft WPF and XAML technology.")
                ]
            }

            let emp9: Employment = {
                EmploymentId: 9,
                EmployerName: "ClearCost Health",
                EmployerImage: "CCH.png",
                EmployerLocation: "Bay Area, CA",
                EmploymentTitle: "Senior Software Engineer",
                EmploymentFrom: "Oct 2013",
                EmploymentTo: "Oct 2016",
                EmployerUrl: "home.clearcosthealth.com",
                Details: [
                    "Developed ".concat("the ClearCost Health web portal where customers can comparison shop ",
                    "for medical services and drugs and save money. Development technologies include Asp.Net 4.5, ",
                    "C# 5.0, Sql Server 2014, VS 2015, Git"),
                    "Developed ".concat("RESTful Web API services for consumption by mobile devices and service partners, ",
                    "using Asp.Net Web API and the Micro-services Architecture Pattern"),
                    "Developed SQL Server Database projects using C# 5.0",
                    "Designed ".concat("and developed media (animations, SVGs) website using Microsoft Azure websites, ",
                    "Cloud Storage, and API Management"),
                    "Developed ".concat("Hybrid Mobile Apps for Android, iOS and the Web, using AngularJS, ",
                    "NodeJS, NPM, Ionic, Cordova, SASS, Gulp, Grunt, Bower, Ripple and TypeScript")
                ]
            }

            let emp10: Employment = {
                EmploymentId: 10,
                EmployerName: "Baker Hughes",
                EmployerImage: "BakerHughes.png",
                EmployerLocation: "San Ramon, CA",
                EmploymentTitle: "Staff Software Engineer",
                EmploymentFrom: "Dec 2016",
                EmploymentTo: "Present",
                EmployerUrl: "www.bakerhughes.com",
                Details: [
                    "Mentored ".concat("a number of members on the team.  Provided assistance and technical ",
                    "instructions on issues with which team members were stuck.  Offered guidance to team members ",
                    "on processes and other work matters"),
                    "Led ".concat("the team in developing the System of Systems, an enterprise system of insight ",
                    "to produce metrics driven decisions, using Angular 6, Docker, GCP, Postgres DB, Arango DB, ",
                    "Influx DB, Dremio and Keycloak"), 
                    "Developed ".concat("the Semantic Knowledge Capture web app, using Angular 4, Typescript, Bootstrap, ",
                    "Nodejs, Jenkins and Kubernetes"),
                    "Developed ".concat("the Asset Tree Browser, the primary navigation tool of the Intellistream ",
                    "enterprise production optimization solution"),
                    "Developed ".concat("the Galileo Thermometer UI microservice and the Geospatial UI microservice ",
                    "on the Predix platform, both of which visualize oil well production across oil fields, ",
                    "using Javascript, D3, and Polymer")
                ]
            }
        this._employments = [emp10, emp9, emp8, emp7, emp6, emp5, emp4, emp3, emp2, emp1];
   }

}
