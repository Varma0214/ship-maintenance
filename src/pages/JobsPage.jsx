import JobList from '../components/Jobs/JobList';
import JobCalendar from '../components/Jobs/JobCalendar';
import '../styles/main.css';

const JobsPage = () => {
  return (
    <div className="jobs-page">
      <JobList />
      <JobCalendar />
    </div>
  );
};

export default JobsPage;