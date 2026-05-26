const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware - Verify JWT token
 * Attaches decoded user to req.user
 */
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No authentication token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

/**
 * Admin Authorization Middleware
 * Checks if user has admin role
 */
const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: 'Authorization error' 
    });
  }
};

/**
 * Recruiter or Admin Middleware
 * Checks if user is recruiter or admin
 */
const isRecruiterOrAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    if (req.user.role !== 'recruiter' && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Recruiter or Admin access required' 
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: 'Authorization error' 
    });
  }
};

module.exports = {
  authenticate,
  isAdmin,
  isRecruiterOrAdmin,
};
