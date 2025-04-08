export interface FaqItem {
  id: string;
  mainTopic: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;

  iconName?: "Wrench" | "Building" | "SquareStack" | string | null;
  items: FaqItem[];
}

const RAW_MAINTENANCE_MANAGEMENT_FAQ = [
  {
    mainTopic: "maintenanceManagment",
    question:
      "The application provides the list of preventive maintenance procedures for a building?",
    answer:
      "ARCHIBUS platform allows you to introduce your current preventive maintenance procedures and change them, according to the equipment you are maintaining.",
  },
  {
    mainTopic: "maintenanceManagment",
    question:
      "Do I have to manually introduce all the data about equipment and the buildings I am maintaining?",
    answer:
      "Main data about building, equipment, teams, users, cost centres are automatically saved in the application. All you need to do is to prepare them in an electronic format (excel, txt., etc.), following a model we can provide and we are going to upload the data automatically, during implementation project.",
  },
  {
    mainTopic: "maintenanceManagment",
    question:
      "Maintenance Management application is also in other languages or only in English?",
    answer:
      " ARCHIBUS is available in more languages, including Croatian, German, Italian, Spanish, French, Dutch, Turkish and even Chinese.",
  },
  {
    mainTopic: "maintenanceManagment",
    question:
      "Does the software application worn me in case I am late on a deadline.",
    answer:
      "Every SLA introduced in the application is tracked and the user will receive a notification about any delay.",
  },
  {
    mainTopic: "maintenanceManagment",
    question: "Can I use the plans of the building I am maintaining?",
    answer:
      "Of course, you can integrate AutoCAD / Revit plans with ARCHIBUS solution, thus being able to locate the equipment in the room, on the floor and in the building you are maintaining.",
  },
  {
    mainTopic: "maintenanceManagment",
    question: "How can I track maintenance activities in the field?",
    answer:
      "Using ARCHIBUS mobile apps, field users will have access to real time data in the application. The data recorded by the field operators (confirmations, details of the work, consumption, etc.) will be available in the application at a touch of a button.",
  },
  {
    mainTopic: "maintenanceManagment",
    question: "Can I monitor planned costs versus real costs?",
    answer:
      "Yes, Maintenance application offers a comparative view on estimated versus real costs",
  },
  {
    mainTopic: "maintenanceManagment",
    question: "Is the mobile app available on both iOS and Android?",
    answer: "Yes, both on iOS and Android.",
  },
  {
    mainTopic: "maintenanceManagment",
    question:
      "Can I start with Corrective Maintenance and then to implement also Preventive Maintenance?",
    answer:
      "Sure. ARCHIBUS is an integrated platform, the user being able to use one single application or add any other needed application.",
  },
  {
    mainTopic: "maintenanceManagment",
    question:
      "If I do not have an IT department, how can I use Maintenance application?",
    answer:
      "You can choose the Cloud version, using ARCHIBUS SaaS. This option saved you the trouble of managing IT infrastructure (hardware for the server, application and database management).",
  },
];

const RAW_PROPERTY_MANAGMENT_FAQ = [
  {
    mainTopic: "propertyManagment",
    question:
      "Does Lease Management application send any alerts before contract expiration",
    answer:
      "The application sends automatic notifications prior to any expiration deadlines (exit clauses, end of contract, due dates, etc.)",
  },
  {
    mainTopic: "propertyManagment",
    question:
      "Is it multicurrency? Can I see the values in HRK, USD and EUR, for example?",
    answer:
      "The application gives you the possibility to use either EURO or LEI. The update in LEI is done automatically at the BNR exchange rate, thanks to an integration.",
  },
  {
    mainTopic: "propertyManagment",
    question: "Asset Management",
    answer:
      "An organization’s physical assets (e.g., desks, computers, chairs, etc.) are often involved with major expenditure, which means that it’s in an organization’s best interest to avoid losses in this area wherever possible. Asset management is a system by which these physical assets are catalogued in a single system of record as a means of minimizing losses and maximizing value for existing equipment. Proper asset management can lead to a reduction in overall equipment costs and increased returns from property.",
  },
  {
    mainTopic: "propertyManagment",
    question: "Agile Workplace/Office",
    answer:
      "In an operational context, the concept of agility refers to procedural flexibility designed to maximize productivity and enhance employee satisfaction through autonomy. Agile workplaces and offices facilitate freedom for workers to make independent decisions on where and how to do their best work. An agile workplace may provide several different curated spaces and flexible seating areas. Employees are given free access to these spaces and do not have to stay put at his or her assigned desk for the duration of the workday.",
  },
  {
    mainTopic: "propertyManagment",
    question:
      "Can I manage more buildings in the application? With different owners?",
    answer:
      "You can manage more buildings, land, with one or more owners. The rent invoice will be issues in the name of the owner for each building.",
  },
  {
    mainTopic: "propertyManagment",
    question: "Does the application support rent indexation?",
    answer:
      "Yes, the type of indexation will be set at the beginning of usage, and indexation can be processed either manually or automatically. All types of indexing criterias available in the application: ⦁\tTotal indexing – the value of the index is applied in total ⦁\tPartial indexing (%) - only a percentage of the index is applied (defined using the field Percentage of the partial indexation) ⦁\tLimited indexing – the indexing will be applied only if the index value is over the limit (defined in Index Variation (%) field)) ⦁\tLimited indexing + Partial Indexing (%): indexing is done only if the index value is over the limit and the value of the used index will be balanced with the percentage defined in Index Variation field (%) ",
  },
  {
    mainTopic: "propertyManagment",
    question:
      "Is the rent invoice issued, as well as the service charge and utilities in the application?",
    answer:
      "Lease2Cash application offers invoicing of several costs: rent, service charge, utilities, marketing expenses, repairing costs, fitout, etc.",
  },
  {
    mainTopic: "propertyManagment",
    question:
      "The application can calculate the cost chargeback with utilities based on consumption?",
    answer:
      "Yes, either you choose a pro-ratio calculation (based on the rented space, if there are no meters for utilities consumption), or you choose a calculation based on meters (utilities consumption registered), the application calculated automatically and invoices the costs of the utilities (water, electricity, gas, etc.)",
  },
  {
    mainTopic: "propertyManagment",
    question:
      "Can I offer a discount on the spot and issue a rent invoice accordingly?",
    answer:
      "Yes, based on the rights of each user, for tracking reasons, the application with record the reason of the discount offered and the user who decided on the given discount.",
  },
  {
    mainTopic: "propertyManagment",
    question: "Can I manage more budgets in the lease management application?",
    answer:
      "Yes. You can manage the annual budget (with 3 hierarchy levels) and even more budgets.",
  },
  {
    mainTopic: "propertyManagment",
    question:
      "Property Management application is also in other languages or only in English?",
    answer:
      "ARCHIBUS is available in more languages, including Croatian, German, Italian, Spanish, French, Dutch and even Chinese.",
  },
];

const RAW_SPACE_MANAGEMENT_FAQ = [
  {
    mainTopic: "spaceManagment",
    question: "Automated Facility Management System",
    answer:
      "Automated facility management focuses on putting facility services on auto pilot. An automated facility management system works is through triggers—if this, then that. An action triggers an appropriate reaction, which decreases the manual work needed to complete a process. Automations make the most of complex chain actions and reactions, rules, and redundancies, all with minimal human intervention. ",
  },
  {
    mainTopic: "spaceManagment",
    question: "AutoCAD",
    answer:
      "AutoCAD is a commercial computer-aided design and drafting software application developed and marketed by Autodesk. ARCHIBUS makes it easy to use AutoCAD files to modify your workplace floor plans. ARCHIBUS integrates with CAD to make these digital models interactive. The idea is that you can click on a point of interest on a digital model of a building, for example, and then ARCHIBUS will give you relevant information on that area. Essentially, ARCHIBUS turns CAD models into a data interface.This combination of CAD with data is known as Building Information Modelling (BIM). Whether you want to see who is assigned to an office by clicking on a floorplan or see what the maintenance history looks like for one of your ventilation systems, BIM has transformed the way we manage our built environment. ARCHIBUS -Smart Client Extension for Revit.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Asset Management",
    answer:
      "An organization’s physical assets (e.g., desks, computers, chairs, etc.) are often involved with major expenditure, which means that it’s in an organization’s best interest to avoid losses in this area wherever possible. Asset management is a system by which these physical assets are catalogued in a single system of record as a means of minimizing losses and maximizing value for existing equipment. Proper asset management can lead to a reduction in overall equipment costs and increased returns from property.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Agile Workplace / Office",
    answer:
      "In an operational context, the concept of agility refers to procedural flexibility designed to maximize productivity and enhance employee satisfaction through autonomy. Agile workplaces and offices facilitate freedom for workers to make independent decisions on where and how to do their best work. An agile workplace may provide several different curated spaces and flexible seating areas. Employees are given free access to these spaces and do not have to stay put at his or her assigned desk for the duration of the workday.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Building Information Modeling (BIM)",
    answer:
      "Building information modelling (BIM) technology centers around 3D modelling programs that provide a customized simulation of an actual building or facility. Most often seen in architecture, construction, and engineering contexts, BIM also has applications for facility management, in which case it may be referred to as BIM FM. The 3D rendering of a particular facility makes it possible for users to virtually move through a space and see its features, dimensions, and infrastructure without making these observations in person. This can be particularly useful for facility management professionals engaging in space planning and other FM activities for offsite buildings.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Building Energy Management System (BEMS)",
    answer:
      "Building energy management system (BEMS) technology allows for the automated control of a facility’s complete energy needs, including lighting, HVAC, security, fire, and other systems. With a BEMS system, power consumption is checked and optimized by a specialized computer program designed to replace manual human management of these systems. This helps cut costs by ensuring that energy consumption is efficient as possible.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Biophilic Design",
    answer:
      "Biophilic design addresses the need to incorporate nature into workspaces by building a framework for these human-nature connections to thrive in. Biophilic design features help create a workplace that perfects the environment for performance, health, and well-being. Individual employees have increased recognition to the natural world, overall reductions in stress and mental fatigue, and improved cognitive performance on tasks.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Benching",
    answer:
      "Benching is the epitome of modern workspaces. There’s no assigned seating or special considerations. It’s just a table and chair, waiting for someone to occupy them. Benching is all most people need to work. Laptops, tablets, and smartphones make full-sized desks or offices less necessary. Coworking facilities use benching to take many of the logistics out of space planning.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Curated Spaces",
    answer:
      "Curated spaces are areas within a workplace that are designed to serve a specific purpose. These areas include equipment, furnishings, and other features that support the specific task they’re intended for. A curated space for collaboration, for example, might have whiteboards, projector equipment, ample seating, and plenty of power outlets to accommodate multiple people and facilitate information sharing.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Coworking",
    answer:
      "Coworking is an arrangement in which several workers from different companies share an office space, allowing cost savings and convenience using common infrastructure, such as equipment, utilities, and receptionist and custodial services, and in some cases refreshments and parcel acceptance services. See Collaborative Workspaces.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Computerized Maintenance Management System (CMMS)",
    answer:
      "Computerized maintenance management systems (CMMS) allow an organization to use a single digitized reporting and recording system for anything relating to maintenance needs in the office. These systems make the process of reporting and addressing physical maintenance problems easier for the employees reporting the problems they see or experience, which can theoretically lead to more frequent and prompter reporting than a traditional in-person or paper reporting system. CMMS tools also allow maintenance staff to quickly see what needs to be fixed to facilitate better planning and make the acquisition of necessary supplies easier as well.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Computer-Aided Facility Management (CAFM)",
    answer:
      "Computer-aided facility management (CAFM) is a revolution in the way FM tasks are carried out. Rather than tracking assets and employees on paper, organizations can now use digitized CAFM programs to easily track, manage, visualize, and conceptualize all the physical elements of an office. CAFM programs make pen-and-paper management and even computerized spreadsheets outdated. CAFM programs focus on space planning and optimization and asset management and are particularly useful while executing facility moves.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Collaborative Workspace",
    answer:
      "Collaborative workspaces are offices in which employees of various companies work under one roof. Companies sharing a collaborative workspace can come in all sizes—from growing startups to global enterprises.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Capacity Planning",
    answer:
      "Capacity planning is a data analysis activity designed to help facilities professionals predict the point at which buildings or individual floors will reach their occupancy capacity. Capacity projections tools can assist with the analysis necessary to perform correct capacity planning.      ",
  },
  {
    mainTopic: "spaceManagment",
    question: "Digital Workplace",
    answer:
      "A digital workplace is one that not only utilizes technology, it’s governed by it. Examples of digital workplace technologies include automated lights, networked wayfinding systems, and connected workstations. The digital workplace is also about doing more with less—and accomplishing more, faster.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Employee Engagement",
    answer:
      "Employee engagement describes the relationship between an employee and the company. A highly engaged employee is not only satisfied with their work, but also feels positively about the company and is motivated to further the company’s larger goals and reputation. The workplace has a major impact on employee engagement and helping employees to feel they are a valuable part of the team and excited to come to work.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Flexible Seating",
    answer:
      "Flexible seating environments do away with assigned seats and let workers choose where they want to sit instead. See agile workplace",
  },
  {
    mainTopic: "spaceManagment",
    question: "Flex (Flexible) Work",
    answer:
      "Flex work allows employees to alter/choose the times and days they work. Employers typically set “core” hours during which employees must work, then flexible hours in which the rest of the work day is completed. Many businesses offer flexible work schedules to accommodate remote employees and those living in different time zones.      ",
  },
  {
    mainTopic: "spaceManagment",
    question: "Flex Space",
    answer:
      "Flex space (or drop-in location): an offsite location between home and the office, for example a shared office hub, coworking space or hot-desking space, often available by the day, hour or month through memberships or short-term leasing of a chair, desk or room.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Facility Managers",
    answer:
      "Facility managers are professionals whose job functions focus on the execution of FM tasks and best practices. These professionals may be responsible for an entire building, including the interior or exterior, or may simply be in charge of FM concerns for a single floor. Organizations that hire dedicated facility managers tend to be larger in scale and have multiple different facilities that need to be properly maintained. Facilities managers may be required to respond to calls and perform maintenance tasks themselves. ",
  },
  {
    mainTopic: "spaceManagment",
    question: "Facility Coordinators",
    answer:
      "Facility coordinators are junior-level professionals who are responsible for lower-level FM tasks in the business world. Such tasks may include restocking supplies, helping to place orders for new furniture, calling for repairs and assisting higher-level office management staff with budgeting. In some cases, “facility coordinator” can be an alternative to the “office manager” job title. Most people in this career path tend to move on to a higher-level job after gaining some experience, often to a higher-level office management role",
  },
  {
    mainTopic: "spaceManagment",
    question: "Facility Management (FM)",
    answer:
      "The facility management process is a broad discipline that takes a high-level view of an organization’s assets, business resources and employees. From the office building itself to the furniture occupying the rooms therein, the computers on the desks and the people using those computers, FM concerns itself with the administration, use and care of an organization’s physical assets and property. This management discipline is primarily concerned with physical logistics, though some technological concerns are becoming increasingly relevant as digital functions become more prominent in the modern workplace.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Human-Centered Workplace Design",
    answer:
      "As the name implies, human-centered workplace design focuses on the needs of the individual people working in the office. There are multiple ways to interpret this concept, including a focus on health and sustainability, user-friendliness, and appealing design that makes employees feel comfortable and “at home” when they’re in the office. Human-centered design places a heavier emphasis on what it might feel like to be in the workplace rather than focusing on bottom-line concerns alone. This doesn’t mean that human-centered workplaces are not cost effective, but the concept represents a movement away from strictly impersonal utilitarianism in office design. Proponents of human-centered workplace design might argue that the workplace is an important resource for recruiting and productivity and therefore should be treated as more than a collection of physical assets.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Hoteling",
    answer:
      "Hoteling is the practice by which desks or seats are reserved for employees on an as-needed basis. These seats, often referred to as hotel desks, may not actually be dedicated workstations but rather seats at shared tables and other workplaces. Employees who are not permanently assigned in an office, such as out-of-town employees on temporary assignment, seasonal contractors or consultants, are generally the best candidates for hoteling as these reserved seats are not designed to be a permanent part of the office’s seating chart. Workplaces that see a high volume of temporary employees coming and going may want to dedicate a few hotel desks. Workplaces that only occasionally need to provision hotel desks may not want to set aside dedicated workstations as these hotel desks may frequently sit empty, which negatively impacts space utilization efficiency.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Hotel Desk",
    answer:
      "Seats that are assigned on an as-needed basis are often referred to as hotel desks. See hoteling.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Hot Desking",
    answer:
      "Hot desking is a seating concept that allows for some open, unassigned seating in an office space. Employees and office mates can then use these desks as needed when they’re available. Hot desks may be particularly useful for offices in which there is a high volume of people who do not need to sit at a desk throughout the day—workers who spend most of their time in a lab but may need a place to sit down and write out reports, for example, can make use of hot desks. The hot desking concept helps increase space utilization efficiency by avoiding the need to assign desks that will sit empty most of the time. With hot desks available, multiple different employees can use the same workstation at different points throughout the day. Hot desks typically don’t have a formal reservation system; workers can simply sit down when a hot desk is empty without needing to plan in advance.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Integrated Workplace Management System (IWMS)",
    answer:
      "Integrated Workplace Management Systems (IWMS) are applications that allow for lease management, move management, stack planning, project management, space management and maintenance management tasks to be carried out within a single program. With a carefully designed IWMS, an organization’s FM team can make quick work of space allocation, resource tracking, facility optimization and more. This makes it easier overall to address budgetary and practical concerns in the workplace without requiring a significant time investment from management personnel.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Move Management",
    answer:
      "Move Management allows organizations to plan and execute well-coordinated, efficient facility transfers from an old office space to a new one. There is a host of concerns to oversee during any moving process, but moving an entire office building from one space to another can be a major logistical undertaking. With proper Move Management, an FM team can easily coordinate details between different departments, track the current and future locations of specific physical objects and design a new Space Planning arrangement in the new building. Conceptual and abstract planning concerns are made much easier with efficient Move Management. Move Management also encompasses smaller moves executed to optimize space, and improve proximity between collaborating employees and departments.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Meeting Room Booking System",
    answer:
      "A meeting room booking system allows for the remote reservation of meeting rooms and other common areas in a facility. These online systems may also have scheduling tools or integrations to facilitate notifications and introduce clarity into the shared space checkout process. Advanced meeting room booking systems often integrate occupancy sensors or other types of sensors to avoid the issue of booked rooms sitting empty. This way, if an employee books a room for a meeting that is then cancelled, the system’s sensors will indicate that the room is unoccupied or that no one has entered the room at the appointed time, allowing the system to automatically release that room back into the system as available for booking. ",
  },
  {
    mainTopic: "spaceManagment",
    question: "Occupancy Sensors",
    answer:
      "Occupancy sensors are responsible for detecting human presence in a specific room or space. These sensors can either automatically scan a room for occupants or be triggered by motion when a person enters or exits an area. One common example of occupancy sensors in real life are seen in bathrooms and other spaces where lights turn on automatically when a person enters. In this example, the lighting system uses an occupancy sensor.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Real Estate Forecasting",
    answer:
      "Effective real estate forecasting allows facilities managers to leverage data and arrive at an informed estimate for future real estate needs. Real estate forecasting usually requires the use of data such as projected future growth rates and total workplace capacity to determine when the organization may need to expand into a larger office space in the future. Specialized projection tools can make this process much easier and more accurate.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Space Planning",
    answer:
      "Space Planning deals with the coordination and allocation of available office space as defined by your available floor plan. An incredibly broad subject, Space Planning handles everything from real estate needs, including size, type and purpose, down to office layout and seating assignments. it can cover the scope of an entire multi-story building or a single room with a dozen desks. The process of Space Planning allows for the optimization of departmental placement. For example, the decision to seat a web design team directly next to the copywriting department can be an efficient choice for intra-departmental collaboration and consultation. These concerns are at the core of space planning and they can evolve over the course of an organization’s growth and development.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Sensors",
    answer:
      "Sensor technology allows for the automation of various data collection efforts. There are two primary sensor types of relevance for facility management: infrastructure sensors and occupants-related sensors. Infrastructure sensors focus on utilities, making it possible to collect information or control usage for equipment, power lines, and other infrastructural facility components. Occupants-related sensors focus on the comfort and productivity of the people who inhabit a facility (i.e., climate control, security, lighting, etc.). Smart sensors can help eliminate waste by automatically turning lights off when a room is empty or adjusting HVAC settings based on ambient temperature. Many occupants-related sensors have motion-detection capabilities to enhance automation and reduce waste.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Ticketing",
    answer:
      "A ticketing system allows users to report problems with a specific system. In a facility management context, ticketing generally refers to facility maintenance issues such as malfunctioning building equipment or janitorial requests. Each issue report is referred to as a ticket.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Workplace or Work Environment",
    answer:
      "Workplace or Work Environment is a platform that comprises of the physical office workspace and other locations including furniture, amendments and services; technologies and resources used for work; as well as the social environment that include colleagues, teams, bosses, agreements, rules and policies that enable a person to perform their work.",
  },
  {
    mainTopic: "spaceManagment",
    question: "Workplace Management",
    answer:
      "Workplace Management falls under the FM umbrella, but it is its own entity with special considerations and processes. As part of FM, Workplace Management zeros in on efficiency and productivity in the office, and its scope of work can extend beyond mere space allocation and focus instead on everything from health and safety protocol to the financial analysis of workplace utilization. Logistics such as security, custodial services, optimal space utilization, and new employee workstation assignments can fall under the purview of workplace management.",
  },
];

export const faqCategories: FaqCategory[] = [
  {
    id: "maintenanceManagment",
    title: "Maintenance Management",
    iconName: "Wrench",
    items: RAW_MAINTENANCE_MANAGEMENT_FAQ.map((item, index) => ({
      id: `${item.mainTopic}-${index}`,
      mainTopic: item.mainTopic,
      question: item.question,
      answer: item.answer,
    })),
  },
  {
    id: "propertyManagment",
    title: "Property & Lease Management",
    iconName: "Building",
    items: RAW_PROPERTY_MANAGMENT_FAQ.map((item, index) => ({
      id: `${item.mainTopic}-${index}`,
      mainTopic: item.mainTopic,
      question: item.question,
      answer: item.answer,
    })),
  },
  {
    id: "spaceManagment",
    title: "Space Management & Planning",
    iconName: "SquareStack",
    items: RAW_SPACE_MANAGEMENT_FAQ.map((item, index) => ({
      id: `${item.mainTopic}-${index}`,
      mainTopic: item.mainTopic,
      question: item.question,
      answer: item.answer,
    })),
  },
  // Za potrebe novih kategorija
  // {
  //   id: "general",
  //   title: "General Questions",
  //   icon: HelpCircle,
  //   items: [
  //      { id: 'general-0', mainTopic: 'general', question: 'What is Archibus?', answer: '...' },
  //      ...
  //   ]
  // }
];

export const allFaqItems: FaqItem[] = faqCategories.flatMap(
  (category) => category.items
);
