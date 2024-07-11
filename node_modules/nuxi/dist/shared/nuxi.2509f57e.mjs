const overrideEnv = (targetEnv) => {
  const currentEnv = process.env.NODE_ENV;
  if (currentEnv && currentEnv !== targetEnv) {
    console.warn(
      `Changing \`NODE_ENV\` from \`${currentEnv}\` to \`${targetEnv}\`, to avoid unintended behavior.`
    );
  }
  process.env.NODE_ENV = targetEnv;
};

export { overrideEnv as o };
