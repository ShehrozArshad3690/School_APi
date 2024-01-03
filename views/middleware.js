function useEffect(callback, dependencies) {
  // Track the dependencies to determine if the effect should run
  const dependencyList = dependencies || [];

  // Keep track of the previous dependencies
  let prevDependencies = [];

  // Check if the dependencies have changed
  const dependenciesChanged = () => {
    for (let i = 0; i < dependencyList.length; i++) {
      if (dependencyList[i] !== prevDependencies[i]) {
        return true;
      }
    }
    return false;
  };

  // Run the effect if there are no dependencies or if they have changed
  const runEffect = () => {
    if (!dependencies || dependenciesChanged()) {
      callback();
      // Update the previous dependencies
      prevDependencies = [...dependencyList];
    }
  };

  // Run the effect on initial render
  runEffect();

  // Return a function to be called when the component unmounts
  return () => {
    // Cleanup code can be added here if needed
  };
}

// Example usage
let count = 0;

function updateCount() {
  console.log(`Count: ${count}`);
}



// Simulate a component unmount (cleanup)
useEffect(() => {
  auth();
});

function auth() {
  const token = localStorage.getItem("token");

  // Redirect to sign-in page if the token is empty or null
  if (!token) {
    window.location.href = "http://localhost:3000/signin.html";
  }
}


function deleteToken(e) {
  e.preventDefault();
  localStorage.removeItem("token");
  window.location.href = "http://localhost:3000/signin.html";
}