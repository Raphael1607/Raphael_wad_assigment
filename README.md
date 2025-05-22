


# Raphael_MarketingModule

This Node.js module simulates a **marketing campaign management system** for an e-commerce application. It allows for creating, managing, and analyzing marketing campaigns, tracking user interactions, and determining campaign effectiveness based on real-time data.

---

## 🔧 Setup Instructions

1. Make sure you have **Node.js installed**.
2. Clone or download this repository to your local machine.
3. Place `Raphael_MarketingModule.js` in your working directory.
4. Create an `app.js` file and require the module like so:
const marketing = require("./Raphael_MarketingModule.js");
at the top of the file 

5. add this into your app.js 
```js

const marketing = require("./Raphael_MarketingModule.js");

console.log("=== Marketing Module Test ===\n");

// 1. Add a new campaign
marketing.addCampaign("Limited Flash", "Limited", 25, "21/5/2025");

// 2. Apply discount to a purchase
marketing.applyDiscount(500, "Black Friday", "user123");

// 3. Expire a campaign
marketing.expireCampaign("Black Friday", "30/5/2025");

// 4. Track a user's view of a campaign (optional demo)
marketing.trackView("Flash Deal", "user456");

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
``` 


6.Run your script using:node app.js


## 📦 Function Descriptions

### 1. addCampaign(name, type, discount, customDate)
Adds a new campaign to the list.

- `name` (String): Campaign title
- `type` (String): Campaign category (e.g. "Limited")
- `discount` (Number): Discount percentage
- `customDate` (String, optional): Date in `dd/mm/yyyy`; defaults to today

---

### 2. applyDiscount(price, campaignName, userId)
Applies discount to a price using a campaign.

- `price` (Number): Original price
- `campaignName` (String): Name of an active campaign
- `userId` (String): User applying the discount

---

### 3. expireCampaign(name, customEndDate)
Marks a campaign as expired.

- `name` (String): Campaign name
- `customEndDate` (String, optional): End date; defaults to today

---

### 4. trackView(campaignName, userId)
Logs a user's view of a campaign.

- `campaignName` (String)
- `userId` (String)

---

### 5. rankCampaignsByEngagementRate()
Ranks campaigns by engagement (usage ÷ views).  
No parameters.

---

### 6. getCampaignStats(name)
Shows details for a specific campaign.

- `name` (String)

---

### 7. getUserUsedPromotions(userId)
Lists all discounts a user has used.

- `userId` (String)

---

### 8. getAllCampaigns()
Prints all campaign summaries.  
No parameters.

---

### 9. getEndingSoonCampaigns(daysLeft)
Lists campaigns ending within `X` days.

- `daysLeft` (Number)



