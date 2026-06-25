const CIA_LABELS = {
  confidentialityImpact: "السرية",
  integrityImpact: "السلامة",
  availabilityImpact: "التوفر",
};

function clampNumber(value, min = 0, max = 5) {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return min;
  }

  return Math.min(max, Math.max(min, numericValue));
}

function getLegacyImpactValues(risk) {
  const fallbackImpact = clampNumber(risk.impact ?? risk.finalImpact, 0, 5);
  const affectedCia = Array.isArray(risk.cia) ? risk.cia : [];

  if (!fallbackImpact) {
    return {
      confidentialityImpact: 0,
      integrityImpact: 0,
      availabilityImpact: 0,
    };
  }

  if (affectedCia.length === 0) {
    return {
      confidentialityImpact: fallbackImpact,
      integrityImpact: fallbackImpact,
      availabilityImpact: fallbackImpact,
    };
  }

  return {
    confidentialityImpact: affectedCia.includes(CIA_LABELS.confidentialityImpact)
      ? fallbackImpact
      : 0,
    integrityImpact: affectedCia.includes(CIA_LABELS.integrityImpact) ? fallbackImpact : 0,
    availabilityImpact: affectedCia.includes(CIA_LABELS.availabilityImpact) ? fallbackImpact : 0,
  };
}

function getRiskImpacts(risk) {
  const hasNewImpactValues = [
    risk.confidentialityImpact,
    risk.integrityImpact,
    risk.availabilityImpact,
  ].some((value) => value !== undefined && value !== null && value !== "");

  if (!hasNewImpactValues) {
    return getLegacyImpactValues(risk);
  }

  return {
    confidentialityImpact: clampNumber(risk.confidentialityImpact, 0, 5),
    integrityImpact: clampNumber(risk.integrityImpact, 0, 5),
    availabilityImpact: clampNumber(risk.availabilityImpact, 0, 5),
  };
}

export function calculateRiskLevel(
  likelihood,
  confidentialityImpact = 0,
  integrityImpact = 0,
  availabilityImpact = 0,
) {
  const likelihoodValue = clampNumber(likelihood, 0, 5);
  const confidentiality = clampNumber(confidentialityImpact, 0, 5);
  const integrity = clampNumber(integrityImpact, 0, 5);
  const availability = clampNumber(availabilityImpact, 0, 5);
  const finalImpact = Math.max(confidentiality, integrity, availability);
  const score = likelihoodValue * finalImpact;

  if (!score || score < 1) {
    return {
      finalImpact,
      score: 0,
      level: "غير محدد",
      colorClass: "risk-unknown",
    };
  }

  if (score <= 2) {
    return {
      finalImpact,
      score,
      level: "منخفض جداً",
      colorClass: "risk-very-low",
    };
  }

  if (score <= 7) {
    return {
      finalImpact,
      score,
      level: "منخفض",
      colorClass: "risk-low",
    };
  }

  if (score <= 14) {
    return {
      finalImpact,
      score,
      level: "متوسط",
      colorClass: "risk-medium",
    };
  }

  if (score <= 19) {
    return {
      finalImpact,
      score,
      level: "مرتفع",
      colorClass: "risk-high",
    };
  }

  return {
    finalImpact,
    score,
    level: "كارثي",
    colorClass: "risk-critical",
  };
}

export function enrichRisk(risk) {
  const impacts = getRiskImpacts(risk);
  const calculated = calculateRiskLevel(
    risk.likelihood,
    impacts.confidentialityImpact,
    impacts.integrityImpact,
    impacts.availabilityImpact,
  );

  return {
    ...risk,
    ...impacts,
    likelihood: clampNumber(risk.likelihood, 1, 5),
    finalImpact: calculated.finalImpact,
    impact: calculated.finalImpact,
    score: calculated.score,
    level: calculated.level,
    colorClass: calculated.colorClass,
  };
}

export function countBy(items, key) {
  return items.reduce((counts, item) => {
    const value = Array.isArray(item[key]) ? item[key] : [item[key]];
    value.filter(Boolean).forEach((entry) => {
      counts[entry] = (counts[entry] || 0) + 1;
    });
    return counts;
  }, {});
}
