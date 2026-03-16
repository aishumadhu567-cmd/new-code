import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./HrEmployeeManagement.css";

function HrEmployeeManagement() {
  const _loggedInUserId = sessionStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("create");
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [docError, setDocError] = useState("");
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const searchResultsRef = useRef(null);
  const formRef = useRef(null);

  const [managerSearchValue, setManagerSearchValue] = useState("");
  const [managerSearchResults, setManagerSearchResults] = useState([]);
  const [showManagerSearch, setShowManagerSearch] = useState(false);
  const [managerSearchLoading, setManagerSearchLoading] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [percentages, setPercentages] = useState(null);
  const [documents, setDocuments] = useState([]);

  const [form, setForm] = useState({
    personalDetailsDTO: {
      firstName: "", middleName: "", lastName: "", gender: "", dob: "",
      nationality: "", maritalStatus: "", bloodGroup: "", aadhaarNumber: "",
      panNumber: "", phoneNumber: "", emailId: "", address1: "", address2: "",
      emergencyContactName: "", emergencyContactRelation: "", emergencyPhoneNumber: "",
    },
    jobDetailsDTO: {
      departmentId: "", designationId: "", workLocation: "", dateOfJoining: "",
    },
    bankDetailsDTO: {
      bankName: "", accountNumber: "", ifsc: "", branchName: "", beneficiaryName: "",
    },
    employeeStatutoryDetailsDTO: {
      pfUan: "", esi: "", min: "",
    },
    salaryDetailsDTO: {
      ctc: "", basic: "", hra: "", conveyanceAllowance: "", pf: "",
    },
    empMgrDto: {
      mgrId: "",
    }
  });

  const [netSalary, setNetSalary] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [existingDocuments, setExistingDocuments] = useState([]);
  const [uploadingDocuments, setUploadingDocuments] = useState({});

  const [existingAadhaars, setExistingAadhaars] = useState([]);
  const [existingPhones, setExistingPhones] = useState([]);
  const [existingEmails, setExistingEmails] = useState([]);

  const [completedSteps, setCompletedSteps] = useState({
    1: false, 2: false, 3: false, 4: false,
    5: false, 6: false, 7: false, 8: false
  });

  const steps = [
    { number: 1, title: "Search Employee", icon: "🔍" },
    { number: 2, title: "Personal Details", icon: "👤" },
    { number: 3, title: "Contact Information", icon: "📞" },
    { number: 4, title: "Job Details", icon: "💼" },
    { number: 5, title: "Manager Assignment", icon: "👔" },
    { number: 6, title: "Bank Details", icon: "🏦" },
    { number: 7, title: "Salary & Statutory", icon: "💰" },
    { number: 8, title: "Document Uploads", icon: "📄" }
  ];

  useEffect(() => {
    axios.get(`/api/departments`, { withCredentials: true })
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Department API error", err));

    axios.get(`/api/designations`, { withCredentials: true })
      .then((res) => setDesignations(res.data))
      .catch((err) => console.error("Designation API error", err));

    axios.get(`/api/salary/calculator/get`, { withCredentials: true })
      .then((res) => {
        const validItem = Array.isArray(res.data)
          ? res.data.find(item => item.basicPercentage > 0)
          : res.data;
        if (validItem) {
          setPercentages({
            basic: Number(validItem.basicPercentage),
            hra: Number(validItem.hraPercentage),
            pf: Number(validItem.pfPercentage),
          });
        }
      })
      .catch((err) => console.error("Salary percentages API error", err));

    const documentTypes = [
      { id: 1, documentName: "joining-letter", key: "joiningLetter", displayName: "Joining Letter", mandatory: true, fileType: "PDF", apiKey: "joining-letter" },
      { id: 2, documentName: "resume", key: "resume", displayName: "Resume", mandatory: true, fileType: "PDF", apiKey: "resume" },
      { id: 3, documentName: "resignation-letter", key: "resignationLetter", displayName: "Resignation Letter", mandatory: false, fileType: "PDF", apiKey: "resignation-letter" },
      { id: 4, documentName: "offer-letter", key: "offerLetter", displayName: "Offer Letter", mandatory: true, fileType: "PDF", apiKey: "offer-letter" },
      { id: 5, documentName: "photograph", key: "photograph", displayName: "Photograph", mandatory: true, fileType: "JPG/PNG", apiKey: "photograph" },
    ];
    setDocuments(documentTypes);
  }, []);

  useEffect(() => {
    axios
      .get("/api/hr/existing-values", { withCredentials: true })
      .then((res) => {
        setExistingAadhaars(res.data?.aadhaars || []);
        setExistingPhones(res.data?.phones || []);
        setExistingEmails(res.data.emails || []);
      })
      .catch((err) => {
        if (err.response?.status !== 404) {
          console.error("Duplicate validation API error", err);
        }
      });
  }, []);

  useEffect(() => {
    if (!percentages || !form.salaryDetailsDTO.ctc) return;
    const ctcAmount = Number(form.salaryDetailsDTO.ctc);
    if (isNaN(ctcAmount) || ctcAmount <= 0) return;

    const basic = (ctcAmount * percentages.basic) / 100;
    const hra = (basic * percentages.hra) / 100;
    const pf = (basic * percentages.pf) / 100;
    const conveyanceAllowance = ctcAmount - (basic + hra + pf);
    const net = ctcAmount - pf;

    setForm(prev => ({
      ...prev,
      salaryDetailsDTO: {
        ...prev.salaryDetailsDTO,
        basic: basic.toFixed(0),
        hra: hra.toFixed(0),
        pf: pf.toFixed(0),
        conveyanceAllowance: conveyanceAllowance.toFixed(0)
      }
    }));
    setNetSalary(net.toFixed(0));
  }, [form.salaryDetailsDTO.ctc, percentages]);

  const handleChange = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const markTouched = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateField = (field, value) => {
    let err = "";

    if (field === "ifsc") {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (value) {
        if (value.length !== 11)
          err = "IFSC must be 11 characters";
        else if (!ifscRegex.test(value))
          err = "Invalid IFSC format (e.g., SBIN0001234)";
      }
    }

    const nameRegex = /^[A-Za-z]+$/;
    const nameSpaceRegex = /^[A-Za-z ]+$/;

    // FIX 1: firstName — max 32 characters added
    if (field === "firstName") {
      if (value) {
        if (!nameRegex.test(value))
          err = "First name should contain only alphabets";
        else if (value.length < 2)
          err = "First name must be at least 2 characters";
        else if (value.length > 32)
          err = "First name cannot exceed 32 characters";
      }
    }

    if (field === "lastName") {
      if (value) {
        if (!nameRegex.test(value))
          err = "Last name should contain only alphabets";
        else if (value.length < 2)
          err = "Last name must be at least 2 characters";
        else if (value.length > 50)
          err = "Last name cannot exceed 50 characters";
      }
    }

    if (field === "dob") {
      if (value) {
        const dob = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (age < 20)
          err = "Employee age must be at least 20 years";
      }
    }

    // FIX 2: dateOfJoining — no future dates
    if (field === "dateOfJoining") {
      if (value) {
        const selected = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected > today)
          err = "Date of joining cannot be a future date";
      }
    }

    // FIX 3: workLocation — no special characters
    if (field === "workLocation") {
      if (value && !/^[A-Za-z0-9 ,.\-]+$/.test(value))
        err = "Work location should not contain special characters";
    }

    if (field === "pan") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
      if (value && !panRegex.test(value)) {
        err = "PAN must be in format ABCDE1234F";
      }
    }

    if (field === "aadhaar") {
      if (value) {
        if (!/^[2-9][0-9]{11}$/.test(value))
          err = "Aadhaar must be 12 digits and cannot start with 0 or 1";
        else if (existingAadhaars.includes(value))
          err = "Aadhaar already exists";
      }
    }

    if (field === "bankName" || field === "branchName") {
      if (value) {
        if (!nameSpaceRegex.test(value)) {
          err = "Only alphabets and spaces are allowed";
        } else if (value.length < 2) {
          err = "Must be at least 2 characters";
        } else if (value.length > 30) {
          err = "Cannot exceed 30 characters";
        }
      }
    }

    // FIX 4: accountNumber — min 9, max 16 digits
    if (field === "accountNumber") {
      if (value) {
        if (!/^[0-9]+$/.test(value)) {
          err = "Account number must contain only digits";
        } else if (value.length < 9) {
          err = "Account number must be at least 9 digits";
        } else if (value.length > 16) {
          err = "Cannot exceed 16 digits";
        }
      }
    }

    if (field === "phone") {
      if (value) {
        if (!/^[6-9][0-9]{9}$/.test(value))
          err = "Phone must start with 6,7,8,9 and be 10 digits";
        else if (existingPhones.includes(value))
          err = "Phone number already exists";
      }
    }

    if (field === "email") {
      if (value) {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(value))
          err = "Enter valid email format";
        else if (existingEmails.includes(value))
          err = "Email already exists";
      }
    }

    if (field === "address") {
      if (value && value.trim().length < 10)
        err = "Address must be at least 10 characters";
    }

    if (field === "emergencyName") {
      if (value && !/^[A-Za-z ]{2,50}$/.test(value))
        err = "Only alphabets allowed (min 2 characters)";
    }

    if (field === "emergencyPhone") {
      if (value && !/^[6-9][0-9]{9}$/.test(value))
        err = "Invalid emergency phone number";
    }

    setErrors(prev => ({ ...prev, [field]: err }));
  };

  const nextStep = () => {
    const isValid = validateCurrentStep();

    if (!isValid) {
      setTimeout(() => {
        if (formRef.current) {
          const firstError = formRef.current.querySelector(".error");
          if (firstError) {
            firstError.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }, 100);
      return;
    }

    setCompletedSteps(prev => ({ ...prev, [currentStep]: true }));

    let next = currentStep + 1;
    if (mode === "edit" && next === 5) next = 6;

    setCurrentStep(Math.min(next, totalSteps));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    let prev = currentStep - 1;
    if (mode === "edit" && prev === 5) prev = 4;
    setCurrentStep(Math.max(prev, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = (step) => {
    if (step < currentStep) {
      setCurrentStep(step);
      return;
    }
    for (let i = 1; i < step; i++) {
      if (!completedSteps[i]) {
        setMessage(`❌ Please complete "${steps[i - 1].title}" first`);
        return;
      }
    }
    setMessage("");
    setCurrentStep(step);
  };

  const validateCurrentStep = () => {
    const hasErrors = Object.values(errors).some(err => err !== "");
    if (hasErrors) return false;

    switch (currentStep) {
      case 2:
        if (!form.personalDetailsDTO.firstName) {
          setErrors(prev => ({ ...prev, firstName: "First name is required" }));
          return false;
        }
        if (!form.personalDetailsDTO.lastName) {
          setErrors(prev => ({ ...prev, lastName: "Last name is required" }));
          return false;
        }
        if (!form.personalDetailsDTO.gender) {
          setErrors(prev => ({ ...prev, gender: "Please select gender" }));
          return false;
        }
        if (!form.personalDetailsDTO.dob) {
          setErrors(prev => ({ ...prev, dob: "Please select date of birth" }));
          return false;
        }
        if (!form.personalDetailsDTO.nationality) {
          setErrors(prev => ({ ...prev, nationality: "Please select nationality" }));
          return false;
        }
        if (!form.personalDetailsDTO.bloodGroup) {
          setErrors(prev => ({ ...prev, bloodGroup: "Please select blood group" }));
          return false;
        }
        if (!form.personalDetailsDTO.aadhaarNumber) {
          setErrors(prev => ({ ...prev, aadhaar: "Aadhaar number is required" }));
          return false;
        }
        if (!form.personalDetailsDTO.panNumber) {
          setErrors(prev => ({ ...prev, pan: "PAN number is required" }));
          return false;
        }
        break;

      case 3:
        if (!form.personalDetailsDTO.phoneNumber) {
          setErrors(prev => ({ ...prev, phone: "Phone number is required" }));
          return false;
        }
        if (!form.personalDetailsDTO.emailId) {
          setErrors(prev => ({ ...prev, email: "Email is required" }));
          return false;
        }
        if (!form.personalDetailsDTO.address1) {
          setErrors(prev => ({ ...prev, address: "Current address is required" }));
          return false;
        }
        if (!form.personalDetailsDTO.emergencyContactName) {
          setErrors(prev => ({ ...prev, emergencyName: "Emergency contact name is required" }));
          return false;
        }
        if (!form.personalDetailsDTO.emergencyContactRelation) {
          setErrors(prev => ({ ...prev, emergencyContactRelation: "Please select emergency relation" }));
          return false;
        }
        if (!form.personalDetailsDTO.emergencyPhoneNumber) {
          setErrors(prev => ({ ...prev, emergencyPhone: "Emergency phone is required" }));
          return false;
        }
        break;

      case 4:
        if (!form.jobDetailsDTO.departmentId) {
          setErrors(prev => ({ ...prev, departmentId: "Please select department" }));
          return false;
        }
        if (!form.jobDetailsDTO.designationId) {
          setErrors(prev => ({ ...prev, designationId: "Please select designation" }));
          return false;
        }
        if (!form.jobDetailsDTO.dateOfJoining) {
          setErrors(prev => ({ ...prev, dateOfJoining: "Please select date of joining" }));
          return false;
        }
        break;

      case 5:
        if (mode === "create" && !form.empMgrDto.mgrId) {
          setErrors(prev => ({ ...prev, mgrId: "Please assign a reporting manager" }));
          return false;
        }
        break;

      case 6:
        if (!form.bankDetailsDTO.bankName) {
          setErrors(prev => ({ ...prev, bankName: "Bank name is required" }));
          return false;
        }
        if (!form.bankDetailsDTO.accountNumber) {
          setErrors(prev => ({ ...prev, accountNumber: "Account number is required" }));
          return false;
        }
        if (!form.bankDetailsDTO.ifsc) {
          setErrors(prev => ({ ...prev, ifsc: "IFSC code is required" }));
          return false;
        }
        if (!form.bankDetailsDTO.branchName) {
          setErrors(prev => ({ ...prev, branchName: "Branch name is required" }));
          return false;
        }
        if (!form.bankDetailsDTO.beneficiaryName) {
          setErrors(prev => ({ ...prev, beneficiary: "Beneficiary name is required" }));
          return false;
        }
        break;

      case 7:
        if (!form.salaryDetailsDTO.ctc || Number(form.salaryDetailsDTO.ctc) <= 0) {
          setErrors(prev => ({ ...prev, ctc: "Valid CTC amount is required" }));
          return false;
        }
        break;

      default:
        break;
    }

    setMessage("");
    return true;
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  // ✅ RESET FORM — clears all state and returns to Step 1
  const resetForm = () => {
    setForm({
      personalDetailsDTO: {
        firstName: "", middleName: "", lastName: "", gender: "", dob: "",
        nationality: "", maritalStatus: "", bloodGroup: "", aadhaarNumber: "",
        panNumber: "", phoneNumber: "", emailId: "", address1: "", address2: "",
        emergencyContactName: "", emergencyContactRelation: "", emergencyPhoneNumber: "",
      },
      jobDetailsDTO: { departmentId: "", designationId: "", workLocation: "", dateOfJoining: "" },
      bankDetailsDTO: { bankName: "", accountNumber: "", ifsc: "", branchName: "", beneficiaryName: "" },
      employeeStatutoryDetailsDTO: { pfUan: "", esi: "", min: "" },
      salaryDetailsDTO: { ctc: "", basic: "", hra: "", conveyanceAllowance: "", pf: "" },
      empMgrDto: { mgrId: "" }
    });
    setCurrentStep(1);
    setMode("create");
    setUserId(null);
    setMessage("");
    setErrors({});
    setTouched({});
    setNetSalary(0);
    setUploadedFiles({});
    setExistingDocuments({});
    setSearchValue("");
    setSearchResults([]);
    setShowSearchResults(false);
    setSelectedEmployee(null);
    setSelectedManager(null);
    setManagerSearchValue("");
    setManagerSearchResults([]);
    setShowManagerSearch(false);
    setDocError("");
    setCompletedSteps({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false });
  };

  const handleSearch = async () => {
    if (!/^VPPL\d{3}$/.test(searchValue)) {
      setMessage("❌ Enter valid Employee ID (VPPL + 3 digits)");
      return;
    }
    try {
      setSearchLoading(true);
      setShowSearchResults(true);
      const res = await axios.get(
        `/api/dept/hr/emp/search?value=${searchValue}`,
        { withCredentials: true }
      );
      const results = Array.isArray(res.data)
        ? res.data
        : res.data ? [res.data] : [];
      setSearchResults(results);
      setTimeout(() => {
        if (results.length > 0 && searchResultsRef.current) {
          searchResultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      if (results.length === 0) setMessage("No employees found");
    } catch {
      setMessage("❌ Failed to search employee");
    } finally {
      setSearchLoading(false);
    }
  };

  const formatDateArray = (dateArr) => {
    if (!Array.isArray(dateArr)) return "";
    const [y, m, d] = dateArr;
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  };

  const loadSelectedEmployee = async () => {
    if (!selectedEmployee) {
      setMessage("❌ Please select an employee first");
      return;
    }
    const fetchedUserId = selectedEmployee.ftechUserId?.userid;
    setUserId(fetchedUserId || null);

    setForm({
      personalDetailsDTO: {
        firstName: selectedEmployee.personalDetailsDTO.firstName || "",
        middleName: selectedEmployee.personalDetailsDTO.middleName || "",
        lastName: selectedEmployee.personalDetailsDTO.lastName || "",
        gender: selectedEmployee.personalDetailsDTO?.gender
          ? selectedEmployee.personalDetailsDTO.gender.charAt(0) +
            selectedEmployee.personalDetailsDTO.gender.slice(1).toLowerCase()
          : "",
        dob: selectedEmployee.personalDetailsDTO.dob || "",
        nationality: selectedEmployee.personalDetailsDTO.nationality || "",
        maritalStatus: selectedEmployee.personalDetailsDTO?.maritalStatus
          ? selectedEmployee.personalDetailsDTO.maritalStatus.charAt(0) +
            selectedEmployee.personalDetailsDTO.maritalStatus.slice(1).toLowerCase()
          : "",
        bloodGroup: selectedEmployee.personalDetailsDTO.bloodGroup || "",
        aadhaarNumber: selectedEmployee.personalDetailsDTO.aadhaarNumber || "",
        panNumber: selectedEmployee.personalDetailsDTO.panNumber || "",
        phoneNumber: selectedEmployee.personalDetailsDTO.phoneNumber || "",
        emailId: selectedEmployee.personalDetailsDTO.emailId || "",
        address1: selectedEmployee.personalDetailsDTO.address1 || "",
        address2: selectedEmployee.personalDetailsDTO.address2 || "",
        emergencyContactName: selectedEmployee.personalDetailsDTO.emergencyContactName || "",
        emergencyContactRelation: selectedEmployee.personalDetailsDTO.emergencyContactRelation || "",
        emergencyPhoneNumber: selectedEmployee.personalDetailsDTO.emergencyPhoneNumber || "",
      },
      jobDetailsDTO: {
        departmentId: selectedEmployee.jobDetailsDTO?.departmentId?.toString() || "",
        designationId: selectedEmployee.jobDetailsDTO?.designationId?.toString() || "",
        workLocation: selectedEmployee.jobDetailsDTO?.workLocation || "",
        dateOfJoining: formatDateArray(selectedEmployee.jobDetailsDTO?.dateOfJoining),
      },
      bankDetailsDTO: {
        bankName: selectedEmployee.bankDetailsDTO.bankName || "",
        accountNumber: selectedEmployee.bankDetailsDTO.accountNumber?.toString() || "",
        ifsc: selectedEmployee.bankDetailsDTO.ifsc || "",
        branchName: selectedEmployee.bankDetailsDTO.branchName || "",
        beneficiaryName: selectedEmployee.bankDetailsDTO.beneficiaryName || "",
      },
      employeeStatutoryDetailsDTO: {
        pfUan: selectedEmployee.employeeStatutoryDetailsDTO.pfUan || "",
        esi: selectedEmployee.employeeStatutoryDetailsDTO.esi || "",
        min: selectedEmployee.employeeStatutoryDetailsDTO.min || "",
      },
      salaryDetailsDTO: {
        ctc: selectedEmployee.salaryDetailsDTO.ctc?.toString() || "",
        basic: selectedEmployee.salaryDetailsDTO.basic?.toString() || "",
        hra: selectedEmployee.salaryDetailsDTO.hra?.toString() || "",
        conveyanceAllowance: selectedEmployee.salaryDetailsDTO.conveyanceAllowance?.toString() || "",
        pf: selectedEmployee.salaryDetailsDTO.pf?.toString() || "",
      },
      empMgrDto: { mgrId: "" }
    });

    if (fetchedUserId) {
      try {
        const res = await axios.get(`/api/hr/search-doc/${fetchedUserId}`, { withCredentials: true });
        setExistingDocuments(res.data);
      } catch (err) {
        console.error("Documents fetch error", err);
      }
    }

    setMode(fetchedUserId ? "edit" : "create");
    setShowSearchResults(false);
    setSelectedEmployee(null);
    setSearchValue("");
    setMessage("✅ Employee loaded for editing");
    setCompletedSteps(prev => ({ ...prev, 1: true }));
    setCurrentStep(2);
  };

  const handleFileChange = async (docKey, file) => {
    if (!file) return;
    setDocError("");

    if (file.size > MAX_FILE_SIZE) {
      setMessage("❌ File size exceeds 10 MB. Please upload a smaller file.");
      return;
    }

    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setMessage("❌ Only PDF, JPG, or PNG files are allowed.");
      return;
    }

    if (mode === "edit" && userId) {
      await uploadDocumentImmediately(docKey, file);
    } else {
      setUploadedFiles(prev => ({ ...prev, [docKey]: file }));
      setMessage(`📁 ${getDocumentDisplayName(docKey)} selected`);
    }
  };

  const uploadDocumentImmediately = async (docKey, file) => {
    if (!userId) return;
    const docConfig = documents.find(d => d.key === docKey);
    if (!docConfig) return;
    setDocError("");
    setUploadingDocuments(prev => ({ ...prev, [docKey]: true }));
    try {
      const existingDoc = existingDocuments.find(d => d.documentName === docConfig.documentName);
      const formData = new FormData();
      formData.append("file", file);

      if (existingDoc && existingDoc.docId) {
        await axios.put(
          `/api/v1/users/${userId}/documents/${existingDoc.docId}/replace`,
          formData,
          { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage(`✅ ${docConfig.displayName} replaced`);
      } else {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("documentType", docConfig.apiKey);
        uploadFormData.append("userId", userId);
        await axios.post(
          `/api/dept/hr/employee/document/upload`,
          uploadFormData,
          { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage(`✅ ${docConfig.displayName} uploaded`);
      }

      const docsRes = await axios.get(`/api/hr/search-doc/${userId}`, { withCredentials: true });
      setExistingDocuments(docsRes.data);
    } catch {
      setMessage(`❌ Failed to upload ${docConfig.displayName}`);
    } finally {
      setUploadingDocuments(prev => ({ ...prev, [docKey]: false }));
    }
  };

  const getDocumentDisplayName = (key) => {
    const doc = documents.find(d => d.key === key);
    return doc ? doc.displayName : key;
  };

  const getFileNameFromPath = (path) => {
    if (!path) return "N/A";
    const parts = path.split("/");
    return parts[parts.length - 1] || "N/A";
  };

  const openDocument = (target) => {
    if (!target) return;

    if (typeof target === "string") {
      window.open(target, "_blank");
      return;
    }

    if (target instanceof File) {
      const url = URL.createObjectURL(target);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      return;
    }
  };

  const submitEmployee = async () => {
    if (loading) return;
    if (!validateCurrentStep()) return;

    const missingDocs = documents
      .filter((doc) => doc.mandatory)
      .filter((doc) => {
        const hasUploaded = Boolean(uploadedFiles[doc.key]);
        const hasExisting = existingDocuments.some((d) => d.documentName === doc.documentName);
        return !(hasUploaded || hasExisting);
      });

    if (missingDocs.length > 0) {
      const firstMissing = missingDocs[0];
      setDocError(`Please upload required document: ${firstMissing.displayName}`);
      setMessage("❌ Please upload all required documents before submitting.");
      setTimeout(() => {
        const element = document.getElementById(`doc-${firstMissing.key}`);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 10);
      return;
    }

    try {
      setLoading(true);
      setMessage("Processing employee...");

      if (mode === "create") {
        const formData = new FormData();
        const payload = {
          personalDetailsDTO: {
            ...form.personalDetailsDTO,
            gender: form.personalDetailsDTO.gender.toUpperCase(),
            maritalStatus: form.personalDetailsDTO.maritalStatus.toUpperCase(),
            panNumber: form.personalDetailsDTO.panNumber.toUpperCase(),
          },
          jobDetailsDTO: {
            ...form.jobDetailsDTO,
            departmentId: Number(form.jobDetailsDTO.departmentId),
            designationId: Number(form.jobDetailsDTO.designationId),
          },
          salaryDetailsDTO: {
            ctc: Number(form.salaryDetailsDTO.ctc),
            basic: Number(form.salaryDetailsDTO.basic),
            hra: Number(form.salaryDetailsDTO.hra),
            conveyanceAllowance: Number(form.salaryDetailsDTO.conveyanceAllowance),
            pf: Number(form.salaryDetailsDTO.pf),
          },
          bankDetailsDTO: form.bankDetailsDTO,
          employeeStatutoryDetailsDTO: form.employeeStatutoryDetailsDTO,
          empMgrDto: {
            mgrId: form.empMgrDto.mgrId ? Number(form.empMgrDto.mgrId) : null
          },
        };

        formData.append("dto", new Blob([JSON.stringify(payload)], { type: "application/json" }));
        for (const docKey of Object.keys(uploadedFiles)) {
          formData.append(docKey, uploadedFiles[docKey]);
        }

        await axios.post(`/api/dept/hr/onboarding`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });

        setMessage("✅ Employee created successfully!");
        setTimeout(() => resetForm(), 2000);

      } else {
        const payload = {
          personalDetailsDTO: {
            ...form.personalDetailsDTO,
            gender: form.personalDetailsDTO.gender.toUpperCase(),
            maritalStatus: form.personalDetailsDTO.maritalStatus.toUpperCase(),
            panNumber: form.personalDetailsDTO.panNumber.toUpperCase(),
          },
          jobDetailsDTO: {
            ...form.jobDetailsDTO,
            departmentId: Number(form.jobDetailsDTO.departmentId),
            designationId: Number(form.jobDetailsDTO.designationId),
          },
          salaryDetailsDTO: {
            ctc: Number(form.salaryDetailsDTO.ctc),
            basic: Number(form.salaryDetailsDTO.basic),
            hra: Number(form.salaryDetailsDTO.hra),
            conveyanceAllowance: Number(form.salaryDetailsDTO.conveyanceAllowance),
            pf: Number(form.salaryDetailsDTO.pf),
          },
          bankDetailsDTO: form.bankDetailsDTO,
          employeeStatutoryDetailsDTO: form.employeeStatutoryDetailsDTO,
          empMgrDto: {
            mgrId: form.empMgrDto.mgrId ? Number(form.empMgrDto.mgrId) : null,
          },
        };

        await axios.put(`/api/dept/hr/employee/edit?userId=${userId}`, payload, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });

        setMessage("✅ Employee updated successfully!");
        setTimeout(() => resetForm(), 2000);
      }

    } catch (err) {
      console.error("Submit employee error", err.response || err);
      const status = err.response?.status;
      if (status === 400) {
        setMessage("❌ Bad request – please check all required fields");
      } else if (status === 401) {
        setMessage("❌ Unauthorized – please log in again");
      } else if (status === 500) {
        setMessage("❌ Server error — please try again");
      } else {
        setMessage(`❌ ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const visibleSteps = mode === "edit"
    ? steps.filter(step => step.number !== 5)
    : steps;

  const handleManagerSearch = async () => {
    if (!managerSearchValue.trim()) {
      setMessage("Please enter manager name or ID to search");
      return;
    }
    try {
      setManagerSearchLoading(true);
      const res = await axios.get(`/api/dept/hr/emp/search?value=${managerSearchValue}`, { withCredentials: true });
      const results = Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];
      setManagerSearchResults(results);
      setShowManagerSearch(true);
      if (results.length === 0) setMessage("No managers found");
    } catch (err) {
      console.error("Manager search error", err.response || err);
      const status = err.response?.status;
      if (status === 404) setMessage("❌ Manager search endpoint not found");
      else if (status === 401) setMessage("❌ Unauthorized - please login");
      else setMessage("❌ Failed to search manager");
    } finally {
      setManagerSearchLoading(false);
    }
  };

  const selectManager = (employeeData) => {
    const managerId = employeeData.ftechUserId?.userid;
    if (managerId) {
      setSelectedManager(employeeData);
      setForm(prev => ({ ...prev, empMgrDto: { mgrId: managerId.toString() } }));
      setErrors(prev => ({ ...prev, mgrId: "" }));
      setMessage(`✅ Manager selected`);
      setShowManagerSearch(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>🔍 Search Employee</h3>
              <p>Search for an existing employee to edit, or skip to create a new one</p>
            </div>
            <div className="search-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="e.g., VPPL001"
                  value={searchValue}
                  maxLength={7}
                  className="modern-input"
                  onFocus={() => {
                    if (!searchValue) setSearchValue("VPPL");
                  }}
                  onChange={(e) => {
                    let value = e.target.value.toUpperCase();
                    if (!value.startsWith("VPPL")) value = "VPPL";
                    const digits = value.slice(4).replace(/\D/g, "");
                    const finalValue = "VPPL" + digits.slice(0, 3);
                    setSearchValue(finalValue);
                  }}
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Enter"].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                    if (e.key === "Enter") handleSearch();
                  }}
                />
                <button onClick={handleSearch} className="search-btn" disabled={searchLoading}>
                  {searchLoading ? "Searching..." : "Search"}
                </button>
              </div>

              {showSearchResults && searchResults.length > 0 && (
                <div className="search-results-card" ref={searchResultsRef}>
                  <div className="results-list">
                    {searchResults.map((emp, idx) => (
                      <div
                        key={idx}
                        className={`result-item ${selectedEmployee === emp ? "selected" : ""}`}
                        onClick={() => setSelectedEmployee(emp)}
                      >
                        <div className="result-info">
                          <h5>{emp.personalDetailsDTO?.firstName} {emp.personalDetailsDTO?.lastName}</h5>
                          <p>ID: {emp.ftechUserId?.userid} | {emp.personalDetailsDTO?.emailId}</p>
                        </div>
                        {selectedEmployee === emp && <span className="check-mark">✓</span>}
                      </div>
                    ))}
                  </div>
                  {selectedEmployee && (
                    <button onClick={loadSelectedEmployee} className="load-btn">
                      Load for Editing
                    </button>
                  )}
                </div>
              )}

              <div className="or-divider"><span>OR</span></div>
              <button onClick={() => setCurrentStep(2)} className="create-new-btn">
                Create New Employee
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>👤 Personal Details</h3>
              <p>Enter basic personal information</p>
            </div>
            <div className="form-grid-2">
              {/* FIX 1: firstName — error only on blur or Next click, not while typing */}
              <div className="input-group">
                <label>First Name <span className="required">*</span></label>
                <input
                  value={form.personalDetailsDTO.firstName}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^A-Za-z]/g, "").slice(0, 32);
                    handleChange("personalDetailsDTO", "firstName", val);
                    if (touched.firstName) validateField("firstName", val);
                    if (val && message === "❌ Please enter first name") setMessage("");
                  }}
                  onBlur={(e) => {
                    markTouched("firstName");
                    validateField("firstName", e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (!/[a-zA-Z]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab")
                      e.preventDefault();
                  }}
                  placeholder="Enter first name"
                  className="modern-input"
                />
                {errors.firstName && <small className="error">{errors.firstName}</small>}
              </div>
              <div className="input-group">
                <label>Middle Name</label>
                <input
                  value={form.personalDetailsDTO.middleName}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^A-Za-z ]/g, "").slice(0, 50);
                    handleChange("personalDetailsDTO", "middleName", val);
                  }}
                  onKeyDown={(e) => {
                    if (!/[a-zA-Z ]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab")
                      e.preventDefault();
                  }}
                  placeholder="Enter middle name"
                  className="modern-input"
                />
              </div>
              <div className="input-group">
                <label>Last Name <span className="required">*</span></label>
                <input
                  value={form.personalDetailsDTO.lastName}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^A-Za-z]/g, "").slice(0, 50);
                    handleChange("personalDetailsDTO", "lastName", val);
                    if (touched.lastName) validateField("lastName", val);
                    if (val && message === "❌ Please enter last name") setMessage("");
                  }}
                  onBlur={(e) => {
                    markTouched("lastName");
                    validateField("lastName", e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (!/[a-zA-Z]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab")
                      e.preventDefault();
                  }}
                  placeholder="Enter last name"
                  className="modern-input"
                />
                {errors.lastName && <small className="error">{errors.lastName}</small>}
              </div>
              <div className="input-group">
                <label>Gender <span className="required">*</span></label>
                <select
                  value={form.personalDetailsDTO.gender}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange("personalDetailsDTO", "gender", val);
                    if (val) setErrors(prev => ({ ...prev, gender: "" }));
                  }}
                  className="modern-input"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <small className="error">{errors.gender}</small>}
              </div>
              <div className="input-group">
                <label>Date of Birth <span className="required">*</span></label>
                <input
                  type="date"
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 20))
                    .toISOString().split("T")[0]}
                  value={form.personalDetailsDTO.dob}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange("personalDetailsDTO", "dob", val);
                    validateField("dob", val);
                  }}
                  className="modern-input"
                />
                {errors.dob && <small className="error">{errors.dob}</small>}
              </div>
              <div className="input-group">
                <label>Nationality <span className="required">*</span></label>
                <select
                  value={form.personalDetailsDTO.nationality}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange("personalDetailsDTO", "nationality", val);
                    if (val) setErrors(prev => ({ ...prev, nationality: "" }));
                  }}
                  className="modern-input"
                >
                  <option value="">Select Nationality</option>
                  <option value="Indian">Indian</option>
                  <option value="American">American</option>
                  <option value="British">British</option>
                  <option value="Other">Other</option>
                </select>
                {errors.nationality && <small className="error">{errors.nationality}</small>}
              </div>
              <div className="input-group">
                <label>Marital Status</label>
                <select
                  value={form.personalDetailsDTO.maritalStatus}
                  onChange={(e) => handleChange("personalDetailsDTO", "maritalStatus", e.target.value)}
                  className="modern-input"
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
              <div className="input-group">
                <label>Blood Group <span className="required">*</span></label>
                <select
                  value={form.personalDetailsDTO.bloodGroup}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange("personalDetailsDTO", "bloodGroup", val);
                    if (val) setErrors(prev => ({ ...prev, bloodGroup: "" }));
                  }}
                  className="modern-input"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                {errors.bloodGroup && <small className="error">{errors.bloodGroup}</small>}
              </div>
              <div className="input-group">
                <label>Aadhaar Number <span className="required">*</span></label>
                <input
                  value={form.personalDetailsDTO.aadhaarNumber}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, "").slice(0, 12);
                    handleChange("personalDetailsDTO", "aadhaarNumber", val);
                  }}
                  onBlur={(e) => {
                    markTouched("aadhaar");
                    validateField("aadhaar", e.target.value);
                  }}
                  placeholder="12-digit Aadhaar"
                  className="modern-input"
                />
                {errors.aadhaar && <small className="error">{errors.aadhaar}</small>}
              </div>
              <div className="input-group">
                <label>PAN Number <span className="required">*</span></label>
                <input
                  value={form.personalDetailsDTO.panNumber}
                  onChange={(e) => {
                    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
                    if (val.length <= 5) {
                      val = val.replace(/[^A-Z]/g, "");
                    } else if (val.length <= 9) {
                      val = val.slice(0, 5).replace(/[^A-Z]/g, "") + val.slice(5).replace(/[^0-9]/g, "");
                    } else {
                      val = val.slice(0, 5).replace(/[^A-Z]/g, "") +
                            val.slice(5, 9).replace(/[^0-9]/g, "") +
                            val.slice(9, 10).replace(/[^A-Z]/g, "");
                    }
                    val = val.slice(0, 10);
                    handleChange("personalDetailsDTO", "panNumber", val);
                  }}
                  onBlur={(e) => {
                    markTouched("pan");
                    validateField("pan", e.target.value);
                  }}
                  placeholder="ABCDE1234F"
                  className="modern-input"
                />
                {errors.pan && <small className="error">{errors.pan}</small>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>📞 Contact Information</h3>
              <p>Phone, email, and address details</p>
            </div>
            <div className="form-grid-2">
              <div className="input-group">
                <label>Phone Number <span className="required">*</span></label>
                <input
                  value={form.personalDetailsDTO.phoneNumber}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    handleChange("personalDetailsDTO", "phoneNumber", val);
                  }}
                  onBlur={(e) => {
                    markTouched("phone");
                    validateField("phone", e.target.value);
                  }}
                  placeholder="10-digit phone"
                  className="modern-input"
                />
                {errors.phone && <small className="error">{errors.phone}</small>}
              </div>
              <div className="input-group">
                <label>Email <span className="required">*</span></label>
                <input
                  type="text"
                  value={form.personalDetailsDTO.emailId}
                  onChange={(e) => {
                    const val = e.target.value.toLowerCase();
                    handleChange("personalDetailsDTO", "emailId", val);
                  }}
                  onBlur={(e) => {
                    markTouched("email");
                    validateField("email", e.target.value);
                  }}
                  placeholder="example@domain.com"
                  className="modern-input"
                />
                {errors.email && <small className="error">{errors.email}</small>}
              </div>
              <div className="input-group full-width">
                <label>Current Address <span className="required">*</span></label>
                <textarea
                  value={form.personalDetailsDTO.address1}
                  onChange={(e) => handleChange("personalDetailsDTO", "address1", e.target.value)}
                  onBlur={(e) => {
                    markTouched("address");
                    validateField("address", e.target.value);
                  }}
                  rows="3"
                  className="modern-input"
                />
                {errors.address && <small className="error">{errors.address}</small>}
              </div>
              <div className="input-group full-width">
                <label>Permanent Address</label>
                <textarea
                  value={form.personalDetailsDTO.address2}
                  onChange={(e) => handleChange("personalDetailsDTO", "address2", e.target.value)}
                  rows="3"
                  placeholder="Enter permanent address"
                  className="modern-input"
                />
              </div>
              <div className="input-group">
                <label>Emergency Contact Name <span className="required">*</span></label>
                <input
                  value={form.personalDetailsDTO.emergencyContactName}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^A-Za-z ]/g, "").slice(0, 50);
                    handleChange("personalDetailsDTO", "emergencyContactName", val);
                  }}
                  onBlur={(e) => {
                    markTouched("emergencyName");
                    validateField("emergencyName", e.target.value);
                  }}
                  className="modern-input"
                />
                {errors.emergencyName && <small className="error">{errors.emergencyName}</small>}
              </div>
              <div className="input-group">
                <label>Emergency Contact Relation <span className="required">*</span></label>
                <select
                  value={form.personalDetailsDTO.emergencyContactRelation}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange("personalDetailsDTO", "emergencyContactRelation", val);
                    if (val) setErrors(prev => ({ ...prev, emergencyContactRelation: "" }));
                  }}
                  className="modern-input"
                >
                  <option value="">Select Relation</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                </select>
                {errors.emergencyContactRelation && <small className="error">{errors.emergencyContactRelation}</small>}
              </div>
              <div className="input-group">
                <label>Emergency Phone Number <span className="required">*</span></label>
                <input
                  value={form.personalDetailsDTO.emergencyPhoneNumber}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    handleChange("personalDetailsDTO", "emergencyPhoneNumber", val);
                  }}
                  onBlur={(e) => {
                    markTouched("emergencyPhone");
                    validateField("emergencyPhone", e.target.value);
                  }}
                  className="modern-input"
                />
                {errors.emergencyPhone && <small className="error">{errors.emergencyPhone}</small>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>💼 Job Details</h3>
              <p>Department, designation, and work information</p>
            </div>
            <div className="form-grid-2">
              <div className="input-group">
                <label>Department <span className="required">*</span></label>
                <select
                  value={form.jobDetailsDTO.departmentId}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange("jobDetailsDTO", "departmentId", val);
                    if (val) setErrors(prev => ({ ...prev, departmentId: "" }));
                  }}
                  className="modern-input"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.departmentName}</option>
                  ))}
                </select>
                {errors.departmentId && <small className="error">{errors.departmentId}</small>}
              </div>
              <div className="input-group">
                <label>Designation <span className="required">*</span></label>
                <select
                  value={form.jobDetailsDTO.designationId}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange("jobDetailsDTO", "designationId", val);
                    if (val) setErrors(prev => ({ ...prev, designationId: "" }));
                  }}
                  className="modern-input"
                >
                  <option value="">Select Designation</option>
                  {designations.map((des) => (
                    <option key={des.id} value={des.id}>{des.designationName}</option>
                  ))}
                </select>
                {errors.designationId && <small className="error">{errors.designationId}</small>}
              </div>
              {/* FIX 2: dateOfJoining — max today, no future dates */}
              <div className="input-group">
                <label>Date of Joining <span className="required">*</span></label>
                <input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={form.jobDetailsDTO.dateOfJoining}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange("jobDetailsDTO", "dateOfJoining", val);
                    validateField("dateOfJoining", val);
                    if (!val) setErrors(prev => ({ ...prev, dateOfJoining: "Please select date of joining" }));
                  }}
                  className="modern-input"
                />
                {errors.dateOfJoining && <small className="error">{errors.dateOfJoining}</small>}
              </div>
              {/* FIX 3: workLocation — no special characters */}
              <div className="input-group">
                <label>Work Location</label>
                <input
                  value={form.jobDetailsDTO.workLocation}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange("jobDetailsDTO", "workLocation", val);
                    validateField("workLocation", val);
                  }}
                  placeholder="Enter work location"
                  className="modern-input"
                />
                {errors.workLocation && <small className="error">{errors.workLocation}</small>}
              </div>
            </div>
          </div>
        );

      case 5:
        if (mode === "edit") return null;
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>👔 Manager Assignment</h3>
              <p>Search and assign a reporting manager</p>
            </div>
            <div className="manager-assignment">
              <div className="manager-search">
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search manager by name or ID"
                    value={managerSearchValue}
                    onChange={(e) => setManagerSearchValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleManagerSearch(); }}
                    className="modern-input"
                  />
                  <button
                    onClick={handleManagerSearch}
                    className="search-btn"
                    disabled={managerSearchLoading}
                  >
                    {managerSearchLoading ? "Searching..." : "Search"}
                  </button>
                </div>
              </div>

              {showManagerSearch && managerSearchResults.length > 0 && (
                <div className="manager-results">
                  {managerSearchResults.map((mgr, idx) => (
                    <div key={idx} className="manager-result-item" onClick={() => selectManager(mgr)}>
                      <h5>{mgr.personalDetailsDTO?.firstName} {mgr.personalDetailsDTO?.lastName}</h5>
                      <p>ID: {mgr.ftechUserId?.userid}</p>
                    </div>
                  ))}
                </div>
              )}

              {selectedManager && (
                <div className="selected-manager-card">
                  <div className="manager-info">
                    <h4>{selectedManager.personalDetailsDTO?.firstName} {selectedManager.personalDetailsDTO?.lastName}</h4>
                    <p>ID: {selectedManager.ftechUserId?.userid}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => {
                      setSelectedManager(null);
                      setForm(prev => ({ ...prev, empMgrDto: { mgrId: "" } }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}

              <p className="skip-note">Select the Manager and don't skip this step.</p>
            </div>
            {errors.mgrId && <small className="error">{errors.mgrId}</small>}
          </div>
        );

      case 6:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>🏦 Bank Details</h3>
              <p>Enter bank account information for salary processing</p>
            </div>
            <div className="form-grid-2">
              <div className="input-group">
                <label>Bank Name <span className="required">*</span></label>
                <input
                  value={form.bankDetailsDTO.bankName}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^A-Za-z ]/g, "").slice(0, 30);
                    handleChange("bankDetailsDTO", "bankName", val);
                  }}
                  onBlur={(e) => {
                    markTouched("bankName");
                    validateField("bankName", e.target.value);
                  }}
                  className="modern-input"
                />
                {errors.bankName && <small className="error">{errors.bankName}</small>}
              </div>
              {/* FIX 4: accountNumber — max 16 digits */}
              <div className="input-group">
                <label>Account Number <span className="required">*</span></label>
                <input
                  value={form.bankDetailsDTO.accountNumber}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, "").slice(0, 16);
                    handleChange("bankDetailsDTO", "accountNumber", val);
                  }}
                  onBlur={(e) => {
                    markTouched("accountNumber");
                    validateField("accountNumber", e.target.value);
                  }}
                  className="modern-input"
                />
                {errors.accountNumber && <small className="error">{errors.accountNumber}</small>}
              </div>
              <div className="input-group">
                <label>IFSC Code <span className="required">*</span></label>
                <input
                  value={form.bankDetailsDTO.ifsc}
                  onChange={(e) => {
                    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11);
                    handleChange("bankDetailsDTO", "ifsc", val);
                  }}
                  onBlur={(e) => {
                    markTouched("ifsc");
                    validateField("ifsc", e.target.value);
                  }}
                  placeholder="SBIN0001234"
                  className="modern-input"
                />
                {errors.ifsc && <small className="error">{errors.ifsc}</small>}
              </div>
              <div className="input-group">
                <label>Branch Name <span className="required">*</span></label>
                <input
                  value={form.bankDetailsDTO.branchName}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^A-Za-z ]/g, "").slice(0, 30);
                    handleChange("bankDetailsDTO", "branchName", val);
                  }}
                  onBlur={(e) => {
                    markTouched("branchName");
                    validateField("branchName", e.target.value);
                  }}
                  className="modern-input"
                />
                {errors.branchName && <small className="error">{errors.branchName}</small>}
              </div>
              <div className="input-group full-width">
                <label>Beneficiary Name <span className="required">*</span></label>
                <input
                  value={form.bankDetailsDTO.beneficiaryName}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^A-Za-z ]/g, "").slice(0, 50);
                    handleChange("bankDetailsDTO", "beneficiaryName", val);
                  }}
                  onBlur={(e) => {
                    markTouched("beneficiary");
                    validateField("beneficiary", e.target.value);
                  }}
                  className="modern-input"
                />
                {errors.beneficiary && <small className="error">{errors.beneficiary}</small>}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>💰 Salary & Statutory Details</h3>
              <p>CTC and statutory information</p>
            </div>
            <div className="salary-calculation-info">
              <h4>Salary Breakdown</h4>
              <p>Basic: {percentages?.basic}% | HRA: {percentages?.hra}% | PF: {percentages?.pf}%</p>
            </div>
            <div className="form-grid-2">
              <div className="input-group full-width">
                <label>CTC (Annual) <span className="required">*</span></label>
                <input
                  type="text"
                  value={form.salaryDetailsDTO.ctc}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    handleChange("salaryDetailsDTO", "ctc", val);
                    if (val && Number(val) > 0) setErrors(prev => ({ ...prev, ctc: "" }));
                  }}
                  placeholder="Enter annual CTC"
                  className="modern-input"
                />
                {errors.ctc && <small className="error">{errors.ctc}</small>}
                <small className="helper-text">Salary components will auto-calculate</small>
              </div>
              <div className="input-group">
                <label>Basic Salary <span className="required">*</span></label>
                <input type="number" value={form.salaryDetailsDTO.basic} readOnly className="modern-input readonly" />
              </div>
              <div className="input-group">
                <label>HRA <span className="required">*</span></label>
                <input type="number" value={form.salaryDetailsDTO.hra} readOnly className="modern-input readonly" />
              </div>
              <div className="input-group">
                <label>PF <span className="required">*</span></label>
                <input type="number" value={form.salaryDetailsDTO.pf} readOnly className="modern-input readonly" />
              </div>
              <div className="input-group">
                <label>Conveyance Allowance <span className="required">*</span></label>
                <input type="number" value={form.salaryDetailsDTO.conveyanceAllowance} readOnly className="modern-input readonly" />
              </div>
              <div className="input-group net-salary-display">
                <label>Net Salary (Annual) <span className="required">*</span></label>
                <input type="number" value={netSalary} readOnly className="modern-input readonly highlight" />
              </div>
            </div>
            <div className="statutory-section">
              <h4>Statutory Details</h4>
              <div className="form-grid-2">
                <div className="input-group">
                  <label>PF UAN</label>
                  <input
                    value={form.employeeStatutoryDetailsDTO.pfUan}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "").slice(0, 12);
                      handleChange("employeeStatutoryDetailsDTO", "pfUan", val);
                      validateField("uan", val);
                    }}
                    placeholder="12-digit UAN"
                    className="modern-input"
                  />
                  {errors.uan && <small className="error">{errors.uan}</small>}
                </div>
                <div className="input-group">
                  <label>ESI Number</label>
                  <input
                    value={form.employeeStatutoryDetailsDTO.esi}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "").slice(0, 10);
                      handleChange("employeeStatutoryDetailsDTO", "esi", val);
                      validateField("esi", val);
                    }}
                    placeholder="10-digit ESI"
                    className="modern-input"
                  />
                  {errors.esi && <small className="error">{errors.esi}</small>}
                </div>
                <div className="input-group full-width">
                  <label>Medical Insurance Number</label>
                  <input
                    value={form.employeeStatutoryDetailsDTO.min}
                    onChange={(e) => handleChange("employeeStatutoryDetailsDTO", "min", e.target.value)}
                    placeholder="Medical insurance number"
                    className="modern-input"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>📄 Document Uploads</h3>
              <p>Upload required documents</p>
            </div>
            {docError && <div className="error" style={{ marginBottom: 12 }}>{docError}</div>}
            {mode === "edit" && existingDocuments.length > 0 && (
              <div className="existing-docs">
                <h4>Existing Documents</h4>
                {existingDocuments.map((doc) => (
                  <div key={doc.docId} className="doc-item">
                    <span>{doc.documentName}</span>
                    <span className="doc-file">{getFileNameFromPath(doc.docPath)}</span>
                    {doc.docPath && (
                      <button
                        type="button"
                        className="view-doc-btn"
                        onClick={() => window.open(doc.docPath, "_blank")}
                      >
                        View
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="document-upload-grid">
              {documents.map((doc) => {
                const isUploading = uploadingDocuments[doc.key];
                const existing = existingDocuments.find((d) => d.documentName === doc.documentName);
                return (
                  <div key={doc.id} id={`doc-${doc.key}`} className="doc-upload-card">
                    <div className="doc-header">
                      <h5>{doc.displayName}</h5>
                      {doc.mandatory
                        ? <span className="badge-required">Required</span>
                        : <span className="badge-optional">Optional</span>}
                    </div>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(doc.key, e.target.files[0])}
                      disabled={loading || isUploading}
                      accept={doc.fileType === "PDF" ? ".pdf" : ".jpg,.jpeg,.png"}
                      className="file-input"
                    />
                    {isUploading && <p className="uploading">Uploading...</p>}
                    {existing && (
                      <div className="existing-doc-cta">
                        <p className="uploaded">✓ {getFileNameFromPath(existing.docPath)}</p>
                        {existing.docPath && (
                          <button
                            type="button"
                            className="view-doc-btn"
                            onClick={() => openDocument(existing.docPath)}
                          >
                            View
                          </button>
                        )}
                      </div>
                    )}
                    {uploadedFiles[doc.key] && (
                      <div className="uploaded-doc-cta">
                        <p className="selected">Selected: {uploadedFiles[doc.key].name}</p>
                        <button
                          type="button"
                          className="view-doc-btn"
                          onClick={() => openDocument(uploadedFiles[doc.key])}
                        >
                          View
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modular-container">
      <div className="modular-card">
        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${
                  ((visibleSteps.findIndex(s => s.number === currentStep) + 1) /
                    visibleSteps.length) * 100
                }%`
              }}
            />
          </div>
          <div className="step-indicators">
            {visibleSteps.map((step) => (
              <div
                key={step.number}
                className={`step-indicator 
                  ${currentStep === step.number ? "active" : ""} 
                  ${completedSteps[step.number] ? "completed" : ""}`}
                onClick={() => goToStep(step.number)}
              >
                <div className="step-number">
                  {completedSteps[step.number] ? "✓" : step.icon}
                </div>
                <span className="step-title">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="step-container" ref={formRef}>
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          {currentStep > 1 && (
            <button onClick={prevStep} className="nav-btn prev-btn">← Previous</button>
          )}
          {currentStep < totalSteps && currentStep !== 1 && (
            <button onClick={nextStep} className="nav-btn next-btn">Next →</button>
          )}
          {currentStep === totalSteps && (
            <button
              onClick={submitEmployee}
              className="submit-btn"
              disabled={loading}
              style={{ pointerEvents: loading ? "none" : "auto" }}
            >
              {loading ? "Processing..." : mode === "create" ? "Create Employee" : "Update Employee"}
            </button>
          )}
        </div>

        {/* Message Toast */}
        {message && (
          <div className={`message-toast ${message.includes("✅") ? "success" : message.includes("❌") ? "error" : "info"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default HrEmployeeManagement;
