import AdminNavbar from "../components/AdminNavbar";
import Container from "../components/Container";
import ProductStat from "../components/ProductStats";
import ProductTable from "../components/ProductTable";
import TrackerDashboard from "../components/TrackerDashboard";

const Dashboard = () => {
  return (
    <main className="min-h-screen mb-130 lg:mb-80 relative z-30 bg-white ">
      <AdminNavbar />
      <Container>
        <div className="mt-20">
          <h1 className="text-black font-bold text-2xl lg:text-4xl text-center">
            Dashboard
          </h1>
          <h2 className="text-black font-bold my-3">Welcome back Admin!</h2>
          <TrackerDashboard />
          <ProductStat />
          <ProductTable />
        </div>
      </Container>{" "}
    </main>
  );
};

export default Dashboard;
