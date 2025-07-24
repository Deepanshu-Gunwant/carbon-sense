// Emission factors by location (kg CO2 per unit)
const emissionFactors = {
  // Default global factors
  global: {
    transport: {
      car: 0.21, // kg CO2 per km
      bus: 0.089, // kg CO2 per km
      train: 0.041, // kg CO2 per km
      bike: 0, // kg CO2 per km
      walk: 0, // kg CO2 per km
      plane: 0.255, // kg CO2 per km
      metro: 0.028, // kg CO2 per km
      taxi: 0.25, // kg CO2 per km
      motorcycle: 0.113, // kg CO2 per km
    },
    electricity: 0.5, // kg CO2 per kWh
    diet: {
      meat: 7.26, // kg CO2 per day
      vegetarian: 3.81, // kg CO2 per day
      vegan: 2.89, // kg CO2 per day
      pescatarian: 4.67, // kg CO2 per day
    },
  },

  // Country-specific factors
  countries: {
    "United States": {
      transport: {
        car: 0.24,
        bus: 0.095,
        train: 0.045,
        bike: 0,
        walk: 0,
        plane: 0.255,
        metro: 0.032,
        taxi: 0.28,
        motorcycle: 0.125,
      },
      electricity: 0.45,
      diet: {
        meat: 8.1,
        vegetarian: 4.2,
        vegan: 3.1,
        pescatarian: 5.1,
      },
    },
    India: {
      transport: {
        car: 0.18,
        bus: 0.075,
        train: 0.025,
        bike: 0,
        walk: 0,
        plane: 0.255,
        metro: 0.022,
        taxi: 0.2,
        motorcycle: 0.095,
      },
      electricity: 0.82, // Higher due to coal dependency
      diet: {
        meat: 5.8,
        vegetarian: 2.9,
        vegan: 2.1,
        pescatarian: 3.8,
      },
    },
    "United Kingdom": {
      transport: {
        car: 0.19,
        bus: 0.082,
        train: 0.035,
        bike: 0,
        walk: 0,
        plane: 0.255,
        metro: 0.025,
        taxi: 0.22,
        motorcycle: 0.108,
      },
      electricity: 0.28, // Lower due to renewables
      diet: {
        meat: 7.8,
        vegetarian: 4.1,
        vegan: 3.0,
        pescatarian: 4.9,
      },
    },
    Germany: {
      transport: {
        car: 0.16,
        bus: 0.078,
        train: 0.032,
        bike: 0,
        walk: 0,
        plane: 0.255,
        metro: 0.024,
        taxi: 0.19,
        motorcycle: 0.102,
      },
      electricity: 0.35,
      diet: {
        meat: 7.2,
        vegetarian: 3.9,
        vegan: 2.8,
        pescatarian: 4.6,
      },
    },
    Canada: {
      transport: {
        car: 0.22,
        bus: 0.088,
        train: 0.038,
        bike: 0,
        walk: 0,
        plane: 0.255,
        metro: 0.029,
        taxi: 0.25,
        motorcycle: 0.118,
      },
      electricity: 0.15, // Very low due to hydro
      diet: {
        meat: 8.5,
        vegetarian: 4.4,
        vegan: 3.2,
        pescatarian: 5.3,
      },
    },
    Australia: {
      transport: {
        car: 0.23,
        bus: 0.092,
        train: 0.042,
        bike: 0,
        walk: 0,
        plane: 0.255,
        metro: 0.031,
        taxi: 0.26,
        motorcycle: 0.121,
      },
      electricity: 0.75, // High due to coal
      diet: {
        meat: 8.8,
        vegetarian: 4.6,
        vegan: 3.4,
        pescatarian: 5.5,
      },
    },
    Japan: {
      transport: {
        car: 0.17,
        bus: 0.076,
        train: 0.028,
        bike: 0,
        walk: 0,
        plane: 0.255,
        metro: 0.021,
        taxi: 0.19,
        motorcycle: 0.098,
      },
      electricity: 0.52,
      diet: {
        meat: 6.1,
        vegetarian: 3.2,
        vegan: 2.4,
        pescatarian: 4.1,
      },
    },
    Brazil: {
      transport: {
        car: 0.2,
        bus: 0.085,
        train: 0.039,
        bike: 0,
        walk: 0,
        plane: 0.255,
        metro: 0.027,
        taxi: 0.23,
        motorcycle: 0.112,
      },
      electricity: 0.08, // Very low due to hydro
      diet: {
        meat: 7.9,
        vegetarian: 4.1,
        vegan: 3.0,
        pescatarian: 4.8,
      },
    },
    China: {
      transport: {
        car: 0.19,
        bus: 0.081,
        train: 0.033,
        bike: 0,
        walk: 0,
        plane: 0.255,
        metro: 0.026,
        taxi: 0.21,
        motorcycle: 0.105,
      },
      electricity: 0.65, // High due to coal
      diet: {
        meat: 6.8,
        vegetarian: 3.6,
        vegan: 2.7,
        pescatarian: 4.3,
      },
    },
    France: {
      transport: {
        car: 0.15,
        bus: 0.074,
        train: 0.029,
        bike: 0,
        walk: 0,
        plane: 0.255,
        metro: 0.02,
        taxi: 0.17,
        motorcycle: 0.095,
      },
      electricity: 0.06, // Very low due to nuclear
      diet: {
        meat: 6.9,
        vegetarian: 3.7,
        vegan: 2.8,
        pescatarian: 4.4,
      },
    },
  },

  // State/region specific adjustments (multipliers)
  stateAdjustments: {
    India: {
      Maharashtra: { electricity: 0.9, transport: 1.1 },
      Delhi: { electricity: 1.1, transport: 1.2 },
      Karnataka: { electricity: 0.8, transport: 1.0 },
      "Tamil Nadu": { electricity: 0.7, transport: 1.0 },
      Gujarat: { electricity: 0.9, transport: 1.1 },
      "West Bengal": { electricity: 1.2, transport: 0.9 },
      Rajasthan: { electricity: 1.0, transport: 0.8 },
      "Uttar Pradesh": { electricity: 1.1, transport: 0.9 },
    },
    "United States": {
      California: { electricity: 0.6, transport: 1.0 },
      Texas: { electricity: 1.2, transport: 1.1 },
      "New York": { electricity: 0.7, transport: 0.9 },
      Florida: { electricity: 1.1, transport: 1.0 },
      Washington: { electricity: 0.3, transport: 1.0 },
      Wyoming: { electricity: 2.0, transport: 1.2 },
    },
  },

  // City-specific adjustments (multipliers)
  cityAdjustments: {
    Mumbai: { electricity: 0.9, transport: 1.2 },
    Delhi: { electricity: 1.1, transport: 1.3 },
    Bangalore: { electricity: 0.8, transport: 1.1 },
    Chennai: { electricity: 0.7, transport: 1.0 },
    Kolkata: { electricity: 1.2, transport: 0.8 },
    Hyderabad: { electricity: 0.9, transport: 1.0 },
    Pune: { electricity: 0.8, transport: 1.1 },
    Ahmedabad: { electricity: 0.9, transport: 1.0 },

    "New York": { electricity: 0.7, transport: 0.8 },
    "Los Angeles": { electricity: 0.6, transport: 1.1 },
    Chicago: { electricity: 1.0, transport: 0.9 },
    Houston: { electricity: 1.3, transport: 1.2 },
    "San Francisco": { electricity: 0.5, transport: 0.7 },
    Seattle: { electricity: 0.3, transport: 0.8 },

    London: { electricity: 0.8, transport: 0.7 },
    Berlin: { electricity: 0.9, transport: 0.8 },
    Paris: { electricity: 0.5, transport: 0.8 },
    Tokyo: { electricity: 1.0, transport: 0.7 },
    Sydney: { electricity: 1.1, transport: 1.0 },
    Toronto: { electricity: 0.4, transport: 0.9 },
  },
}

// Function to get emission factors for a specific location
const getEmissionFactors = (country, state, city) => {
  try {
    // Start with global defaults
    let factors = JSON.parse(JSON.stringify(emissionFactors.global))

    // Apply country-specific factors if available
    if (emissionFactors.countries[country]) {
      const countryFactors = emissionFactors.countries[country]
      factors = {
        transport: { ...factors.transport, ...countryFactors.transport },
        electricity: countryFactors.electricity || factors.electricity,
        diet: { ...factors.diet, ...countryFactors.diet },
      }
    }

    // Apply state adjustments if available
    if (state && emissionFactors.stateAdjustments[country] && emissionFactors.stateAdjustments[country][state]) {
      const stateAdj = emissionFactors.stateAdjustments[country][state]
      if (stateAdj.electricity) {
        factors.electricity *= stateAdj.electricity
      }
      if (stateAdj.transport) {
        Object.keys(factors.transport).forEach((mode) => {
          factors.transport[mode] *= stateAdj.transport
        })
      }
    }

    // Apply city adjustments if available
    if (city && emissionFactors.cityAdjustments[city]) {
      const cityAdj = emissionFactors.cityAdjustments[city]
      if (cityAdj.electricity) {
        factors.electricity *= cityAdj.electricity
      }
      if (cityAdj.transport) {
        Object.keys(factors.transport).forEach((mode) => {
          factors.transport[mode] *= cityAdj.transport
        })
      }
    }

    return factors
  } catch (error) {
    console.error("Error getting emission factors:", error)
    return emissionFactors.global
  }
}

// Function to get available countries
const getAvailableCountries = () => {
  return Object.keys(emissionFactors.countries)
}

// Function to get country-specific transport modes
const getTransportModes = (country) => {
  const countryFactors = emissionFactors.countries[country] || emissionFactors.global
  return Object.keys(countryFactors.transport)
}

module.exports = {
  emissionFactors,
  getEmissionFactors,
  getAvailableCountries,
  getTransportModes,
}
