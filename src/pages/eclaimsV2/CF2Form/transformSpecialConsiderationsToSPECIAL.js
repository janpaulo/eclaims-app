export const transformSpecialConsiderationsToSPECIAL = (formData={}) => {
    const proceduresMap = {
      "Hemodialysis": "HEMODIALYSIS",
      "Peritoneal Dialysis": "PERITONEAL",
      "Radiotherapy (LINAC)": "LINAC",
      "Radiotherapy (COBALT)": "COBALT",
      "Blood Transfusion": "TRANSFUSION",
      "Brachytherapy": "BRACHYTHERAPHY",
      "Chemotherapy": "CHEMOTHERAPY",
      "Simple Debridement": "DEBRIDEMENT"
    };
    const procedures = Object.keys(proceduresMap)
    .filter((label) => (formData?.[label]))
    .map((label) => {
      const key = proceduresMap[label];
      const selectedDates = formData?.[`${label}_selectedDates`] || [];
      return {
        [key]: {
          SESSIONS: selectedDates.map((date) => ({ pSessionDate: date })),
        },
      };
    });
  
  
    return {
      SPECIAL: {
        PROCEDURES: {
          HEMODIALYSISOrPERITONEALOrLINACOrCOBALTOrTRANSFUSIONOrBRACHYTHERAPHYOrCHEMOTHERAPYOrDEBRIDEMENTOrIMRT: procedures
        },
        MCP: {
          pCheckUpDate1: formData.mcpDate1 || "",
          pCheckUpDate2: formData.mcpDate2 || "",
          pCheckUpDate3: formData.mcpDate3 || "",
          pCheckUpDate4: formData.mcpDate4 || ""
        },
        TBDOTS: {
          pTBType: formData["Intensive Phase"] ? "I" : formData["Maintenance Phase"] ? "M" : "",
          pNTPCardNo: ""
        },
        ABP: {
          pDay0ARV: formData["Day 0 ARV"] || "",
          pDay3ARV: formData["Day 3 ARV"] || "",
          pDay7ARV: formData["Day 7 ARV"] || "",
          pRIG: formData.RIG || "",
          pABPOthers: formData.pABPOthers ,
          pABPSpecify: formData.pABPSpecify || ""
        },
        NCP: {
          pEssentialNewbornCare: formData["Essential Newborn Care"] ? "Y" : "N",
          pNewbornHearingScreeningTest: formData["Newborn Hearing Screening Test"] ? "Y" : "N",
          pNewbornScreeningTest: formData["Newborn Screening Test"] ? "Y" : "N",
          pFilterCardNo: "",
          ESSENTIAL: {
            pDrying: formData["Immediate drying of newborn"] ? "Y" : "N",
            pSkinToSkin: formData["Early skin-to-skin contact"] ? "Y" : "N",
            pCordClamping: formData["Timely cord clamping"] ? "Y" : "N",
            pProphylaxis: formData["Eye Prophylaxis"] ? "Y" : "N",
            pVitaminK: formData["Vitamin K administration"] ? "Y" : "N",
            pBCG: formData["BCG vaccination"] ? "Y" : "N",
            pHepatitisB: formData["Hepatitis B vaccination"] ? "Y" : "N",
            pNonSeparation: formData["Non-separation of mother/baby for early breastfeeding initiation"] ? "Y" : "N",
            pWeighing: "N"
          }
        },
        HIVAIDS: {
          pLaboratoryNumber: formData.pLaboratoryNumber || ""
        },
        CATARACTINFO: {
          pCataractPreAuth: formData.pCataractPreAuth || "",
          pLeftEyeIOLStickerNumber: formData.pLeftEyeIOLStickerNumber || "",
          pLeftEyeIOLExpiryDate: formData.pLeftEyeIOLExpiryDate || "",
          pRightEyeIOLStickerNumber: formData.pRightEyeIOLStickerNumber || "",
          pRightEyeIOLExpiryDate: formData.pRightEyeIOLExpiryDate || ""
        }
      }
    };
  };
  