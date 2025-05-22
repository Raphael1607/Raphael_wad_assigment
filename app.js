// app.js

const marketing = require("./Raphael_MarketingModule.js");

console.log("=== Marketing Module Test ===\n");

// 1. Add a new campaign
marketing.addCampaign("Limited Flash", "Limited", 25, "21/5/2025");

// 2. Apply discount to a purchase
marketing.applyDiscount(500, "Black Friday", "user123");

// 3. Expire a campaign
marketing.expireCampaign("Black Friday", "30/5/2025");

// 4. Track a user's view of a campaign (optional demo)
marketing.trackView("Flash Deal", "user456"); // example view

// 5. Rank campaigns by engagement rate
marketing.rankCampaignsByEngagementRate();

// 6. View detailed campaign statistics
marketing.getCampaignStats("Flash Deal");

// 7. Get all promotions used by a user
marketing.getUserUsedPromotions("user123");

// 8. List all campaigns (summary)
marketing.getAllCampaigns();

// 9. Get campaigns ending soon (within 10 days)
marketing.getEndingSoonCampaigns(10);
