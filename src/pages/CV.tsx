import DefaultLayout from "../layouts/DefaultLayout";

const calculateYearsOfExperience = (startDate: Date) => {
  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffInMilliseconds = currentDate.getTime() - startDate.getTime();

  // Convert the difference to years
  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  // Round down to the nearest integer
  const yearsOfExperience = Math.floor(diffInYears);

  return yearsOfExperience;
}

const CV = () => {
  document.title = 'CV: Joseph Abell';

  const yearsExperience = calculateYearsOfExperience(new Date(2012, 11, 1));

  return (
    <DefaultLayout>
      <h1>CV - Joseph Abell</h1>

      <p>I'm Joseph Abell, a Lead Software Engineer with {yearsExperience} years experience.
        I'm currently working at Tesco Bank in a remote role. I occasionally develop websites
        for my wife's company, Abell Design, when time allows.</p>

      <p>Typically, you'll find me providing context for technical decisions, unblocking
        engineers when something stretches their ability, training, running
        knowledge sharing meetings, and managing Engineers. I am the spokesperson for technical
        quality. I uphold coding standards and testing coverage. I am the point of contact when
        people need to know who to speak to to solve problems. I attend leadership meetings to make
        sure the team is working towards the company's wider goals. I rarely write code inside work
        hours, but I do a lot of code reviews.</p>

      <p>I find myself using curiosity and empathy on an hourly basis. I try my best to understand
        problems before I deliver solutions, and I try to leave room for others to grow in their skills,
        rather than delivering work that others can do. I'd rather spend the time coaching others and watching
        them improve, rather than being the only person able to do a job.</p>

      <p>Outside of work, I study management techniques, and keep my skills up to date by making small
        websites to test out new tech stacks. I also spend my time listening to history audiobooks, and looking after the kids.</p>

      <h2>Contact</h2>

      <p>Joseph Abell - jobs@josephabell.co.uk</p>

      <h2>Places I've worked</h2>

      <h3>Tesco Bank - Engineering Lead</h3>

      <p>Sep 2023 - Current</p>

      <p>My current role at Tesco Bank is to be Engineering Lead for the Spend and Save
        team. For more information about this role, read my introduction above.</p>

      <p>I helped shape a team whose members were moving from different areas of the company, into a calm and supportive unit.
        Over the first eight months with the team, we have switched to working in an Agile methodology,
        have moved from using EC2 instances for deliver to Kubernetes, and every member of the team can deliver
        quality work from inception to pushing to production servers. The team have moved from an in house tech
        stack to NextJS.</p>

      <h3>Tesco Bank - Senior Software Engineer</h3>

      <p>Feb 2022 - Sep 2023</p>

      <p>My role at Tesco Bank changed rapidly from a full stack developer into leading
        my own team, code shepherding, mentoring and organising work for 8 devs and 6 QA.
        We rewrote the Motor Insurance onboarding form using internal tools
        built on Node and React as the primary technologies. My favourite parts of this role
        were less on the code, more on mentoring, organising the team so we didn't trip over
        each other's work, and managing team members.</p>

      <h3>Isotoma - Full Stack Typescript Developer</h3>

      <p>Feb 2020 - Feb 2022</p>

      <p>I spent my time at Isotoma as a full stack developer working on complex web applications.
        As the teams at Isotoma are small, I was trusted to deliver all aspects of
        web apps. My tech stack was React, Typescript, AWS lambda, and dynamodb, amongst others.</p>

      <h3>Netsells - Senior Javascript Developer</h3>

      <p>September 2019 - Feb 2020</p>

      <p>My role at Netsells was to write the frontend for Vue apps.</p>

      <h3>Piksel - Senior Javascript Developer</h3>

      <p>March 2015 - September 2019</p>

      <p>My job at Piksel changed over time, I was there a while, but at the end I
        helped a large, multi-national team of 20+ developers to create a custom CMS for media companies.
        I helped take an old Angular 1.5 app and rewrote it into a react app. I thoroughly
        enjoyed working with a team of developers from Spain and Vietnam.</p>

      <p>Also at Piksel I helped write a white label Video on Demand application
        for web, android, ios and televisions.</p>

      <h3>Purenet, and their sister company Agency51 - Frontend Developer</h3>

      <p>December 2012 - March 2015</p>

      <p>My role was to deliver whitelabel ecommerce sites, with a focus on accessibility.</p>

      <h2>Education</h2>

      <p>BA (Hons) English. University of Cumbria, Lancaster. 2011 - 2013</p>

      <h2>References</h2>

      <p>Available on request.</p>
    </DefaultLayout>
  )
};

export default CV;
